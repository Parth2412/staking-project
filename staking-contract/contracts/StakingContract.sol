// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";

contract StakingContract is Initializable, OwnableUpgradeable, UUPSUpgradeable, ReentrancyGuardUpgradeable {
    IERC20 public stakingToken;
    address public multiSigAddress;

    struct StakingInfo {
        uint256 amount;
        uint256 stakingTime;
        uint256 duration;
        bool withdrawn;
    }

    struct RewardInfo {
        uint256 duration;
        uint256 rewardPercentage;
        uint256 earlyUnstakePenalty;
        uint256 cooldownPeriod;
    }

    mapping(address => StakingInfo) public stakingDetails;
    mapping(uint256 => RewardInfo) public rewardTiers;

    event Staked(address indexed user, uint256 amount, uint256 duration);
    event Unstaked(address indexed user, uint256 amount, bool early, uint256 penalty);

    modifier onlyMultiSig() {
        require(msg.sender == multiSigAddress, "Only multi-signature address can execute this.");
        _;
    }

    function initialize(IERC20 _stakingToken, address _multiSigAddress) public initializer {
        __UUPSUpgradeable_init();
        __ReentrancyGuard_init();

        stakingToken = _stakingToken;
        multiSigAddress = _multiSigAddress;

        rewardTiers[1] = RewardInfo(1 weeks, 5, 2, 1 days);   // 1 week, 5% reward, 2% penalty, 1-day cooldown
        rewardTiers[4] = RewardInfo(4 weeks, 10, 5, 2 days);  // 4 weeks, 10% reward, 5% penalty, 2-day cooldown
        rewardTiers[8] = RewardInfo(8 weeks, 20, 10, 3 days); // 8 weeks, 20% reward, 10% penalty, 3-day cooldown
    }

    function stake(uint256 _amount, uint256 _duration) external nonReentrant {
        require(_amount > 0, "Amount must be greater than zero");
        require(rewardTiers[_duration].duration != 0, "Invalid staking duration");

        stakingToken.transferFrom(msg.sender, address(this), _amount);

        stakingDetails[msg.sender] = StakingInfo({
            amount: _amount,
            stakingTime: block.timestamp,
            duration: _duration,
            withdrawn: false
        });

        emit Staked(msg.sender, _amount, _duration);
    }

    function unstake() external nonReentrant {
        StakingInfo storage stakeInfo = stakingDetails[msg.sender];
        require(stakeInfo.amount > 0, "No funds to unstake");
        require(!stakeInfo.withdrawn, "Already withdrawn");

        RewardInfo memory rewardInfo = rewardTiers[stakeInfo.duration];
        uint256 stakedTime = block.timestamp - stakeInfo.stakingTime;

        bool earlyUnstake = stakedTime < rewardInfo.duration;
        uint256 penalty = 0;
        uint256 amountToWithdraw = stakeInfo.amount;

        if (earlyUnstake) {
            require(stakedTime >= rewardInfo.cooldownPeriod, "Cooldown period not reached");
            penalty = (stakeInfo.amount * rewardInfo.earlyUnstakePenalty) / 100;
            amountToWithdraw -= penalty;
        } else {
            uint256 reward = (stakeInfo.amount * rewardInfo.rewardPercentage) / 100;
            amountToWithdraw += reward;
        }

        stakingToken.transfer(msg.sender, amountToWithdraw);
        stakeInfo.withdrawn = true;

        emit Unstaked(msg.sender, amountToWithdraw, earlyUnstake, penalty);
    }

    function setRewardTiers(
        uint256 _duration,
        uint256 _rewardPercentage,
        uint256 _earlyUnstakePenalty,
        uint256 _cooldownPeriod
    ) external onlyMultiSig {
        rewardTiers[_duration] = RewardInfo({
            duration: _duration,
            rewardPercentage: _rewardPercentage,
            earlyUnstakePenalty: _earlyUnstakePenalty,
            cooldownPeriod: _cooldownPeriod
        });
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}

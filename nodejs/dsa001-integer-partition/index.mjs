// https://reintech.io/blog/solving-partition-problem-in-javascript


function canPartition(nums) {
	let sum = nums.reduce((a, b) => a + b, 0);
	if (sum % 2 !== 0) return false;
	sum = sum / 2;
	let dp = new Array(sum + 1).fill(false);
	dp[0] = true;
	for (let num of nums) {
		for (let i = sum; i >= num; i--) {
			dp[i] = dp[i] || dp[i - num];
		}
	}
	return dp[sum];
}


const TC = [3, 1, 5, 9, 12]
console.log('Can', TC, 'be partitioned?', canPartition(TC))

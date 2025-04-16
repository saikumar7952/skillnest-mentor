
import { CodingQuestion } from '@/types/coding';

// Sample coding questions data
export const codingQuestions: CodingQuestion[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
    You may assume that each input would have exactly one solution, and you may not use the same element twice.
    Example:
    Input: nums = [2, 7, 11, 15], target = 9
    Output: [0, 1]
    Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].`,
    starterCode: `function twoSum(nums, target) {
  // Your code here
  
}`,
    solutionTests: `
// Test cases
function runTests() {
  let passed = true;
  let results = [];
  
  // Test case 1
  let result1 = twoSum([2, 7, 11, 15], 9);
  let test1Passed = (result1[0] === 0 && result1[1] === 1) || (result1[0] === 1 && result1[1] === 0);
  results.push({ test: "twoSum([2, 7, 11, 15], 9)", expected: "[0, 1]", actual: JSON.stringify(result1), passed: test1Passed });
  passed = passed && test1Passed;
  
  // Test case 2
  let result2 = twoSum([3, 2, 4], 6);
  let test2Passed = (result2[0] === 1 && result2[1] === 2) || (result2[0] === 2 && result2[1] === 1);
  results.push({ test: "twoSum([3, 2, 4], 6)", expected: "[1, 2]", actual: JSON.stringify(result2), passed: test2Passed });
  passed = passed && test2Passed;
  
  // Test case 3
  let result3 = twoSum([3, 3], 6);
  let test3Passed = (result3[0] === 0 && result3[1] === 1) || (result3[0] === 1 && result3[1] === 0);
  results.push({ test: "twoSum([3, 3], 6)", expected: "[0, 1]", actual: JSON.stringify(result3), passed: test3Passed });
  passed = passed && test3Passed;
  
  return { passed, results };
}
`,
    timeComplexity: "O(n)",
    category: "Arrays & Hashing"
  },
  {
    id: 2,
    title: "Valid Palindrome",
    difficulty: "Easy",
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.
    Alphanumeric characters include letters and numbers.
    Given a string s, return true if it is a palindrome, or false otherwise.
    Example:
    Input: s = "A man, a plan, a canal: Panama"
    Output: true
    Explanation: "amanaplanacanalpanama" is a palindrome.`,
    starterCode: `function isPalindrome(s) {
  // Your code here
  
}`,
    solutionTests: `
// Test cases
function runTests() {
  let passed = true;
  let results = [];
  
  // Test case 1
  let result1 = isPalindrome("A man, a plan, a canal: Panama");
  results.push({ test: "isPalindrome('A man, a plan, a canal: Panama')", expected: "true", actual: result1.toString(), passed: result1 === true });
  passed = passed && result1 === true;
  
  // Test case 2
  let result2 = isPalindrome("race a car");
  results.push({ test: "isPalindrome('race a car')", expected: "false", actual: result2.toString(), passed: result2 === false });
  passed = passed && result2 === false;
  
  // Test case 3
  let result3 = isPalindrome(" ");
  results.push({ test: "isPalindrome(' ')", expected: "true", actual: result3.toString(), passed: result3 === true });
  passed = passed && result3 === true;
  
  return { passed, results };
}
`,
    timeComplexity: "O(n)",
    category: "Strings"
  },
  {
    id: 3,
    title: "Valid Anagram",
    difficulty: "Easy",
    description: `Given two strings s and t, return true if t is an anagram of s, and false otherwise.
    An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
    Example:
    Input: s = "anagram", t = "nagaram"
    Output: true`,
    starterCode: `function isAnagram(s, t) {
  // Your code here
  
}`,
    solutionTests: `
// Test cases
function runTests() {
  let passed = true;
  let results = [];
  
  // Test case 1
  let result1 = isAnagram("anagram", "nagaram");
  results.push({ test: "isAnagram('anagram', 'nagaram')", expected: "true", actual: result1.toString(), passed: result1 === true });
  passed = passed && result1 === true;
  
  // Test case 2
  let result2 = isAnagram("rat", "car");
  results.push({ test: "isAnagram('rat', 'car')", expected: "false", actual: result2.toString(), passed: result2 === false });
  passed = passed && result2 === false;
  
  // Test case 3
  let result3 = isAnagram("a", "a");
  results.push({ test: "isAnagram('a', 'a')", expected: "true", actual: result3.toString(), passed: result3 === true });
  passed = passed && result3 === true;
  
  return { passed, results };
}
`,
    timeComplexity: "O(n)",
    category: "Strings"
  }
];

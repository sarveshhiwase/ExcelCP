// @ts-nocheck 
import codeforcesData from "../assets/codeforces-problems.json";
const getContestProblemsGroupped = (minRating = 0, maxRating = 4000) => {
    const problems = codeforcesData.result.problems;
    const problemStatistics = codeforcesData.result.problemStatistics;
    const contestsWithProblems = {};
    for (let i = 0; i < problems.length; i++) {
        const problem = problems[i];
        if (!problem.rating || problem.rating < minRating || problem.rating > maxRating)
            continue;
        const problemToBeAdded = {
            contestId: problem.contestId,
            name: problem.name,
            index: problem.index,
            tags: problem.tags,
            link: 'https://codeforces.com/problemset/problem/' +
                problem.contestId +
                '/' +
                problem.index,
            rating: problem.rating ? problem.rating : 'Not found',
        };
        if (contestsWithProblems[problem.contestId]) {
            contestsWithProblems[problem.contestId] = [
                ...contestsWithProblems[problem.contestId],
                problemToBeAdded,
            ];
        }
        else {
            contestsWithProblems[problem.contestId] = [problemToBeAdded];
        }
    }
    for (let i = 0; i < problemStatistics.length; i++) {
        const problemStatistic = problemStatistics[i];
        const problemToFind = problemStatistic.index;
        const solvedCountOfProblem = problemStatistic.solvedCount;
        const idx = contestsWithProblems[String(problemStatistic.contestId)]?.findIndex((problem) => problem.index == problemToFind);
        if (idx && idx != -1) {
            contestsWithProblems[problemStatistic.contestId][idx]['solvedCount'] = solvedCountOfProblem;
        }
    }
    const sortedContestsWithProblems = {};
    Object.keys(contestsWithProblems).sort().forEach((key) => {
        sortedContestsWithProblems[key] = contestsWithProblems[key];
    });
    // console.log(sortedContestsWithProblems);
    return sortedContestsWithProblems;
};
const getProblems = () => {
    const contestsWithProblems = getContestProblemsGroupped();
    let allProblems = [];
    for (const key in contestsWithProblems) {
        allProblems = [...allProblems, ...contestsWithProblems[key]];
    }
    return allProblems;
};
const randomColors = () => {
    const colors = ['blue', 'red', 'green', 'yellow', 'indigo', 'purple', 'pink'];
    const randomIndex = Math.round(Math.random() * (colors.length - 1));
    return colors[randomIndex];
};
const Helpers = {
    getProblems,
    getContestProblemsGroupped,
    randomColors
};
export default Helpers;

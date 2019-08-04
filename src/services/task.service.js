export const taskService = {
    getDifferenceInDays,
    isAssignedToTask
};

function getDifferenceInDays(date1, date2) {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (date1 > date2) {
        return -diffDays;
    } else {
        return diffDays;
    }
}

function isAssignedToTask(task) {
    const username = localStorage.getItem('user').username;
    task.assignedUsers.forEach(function (user) {
        if (user.username === username) {
            return true;
        }
    });
    return false;
}

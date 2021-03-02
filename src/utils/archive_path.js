
exports.monthlyArchivePath = (year, month)=> {
    return `/archives/${year}${month.toString().padStart(2,0)}`
}

exports.directoryArchivePath = (directory) => {
    return `/${directory}`
}

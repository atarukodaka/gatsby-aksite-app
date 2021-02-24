const config = require('../../config')

const directoryLabel = (directory) => {

    const parts = directory.split('/')

    let i = 0
    return parts.map(v => {
        i = i + 1
        return config.directory_labels[`/${parts.slice(0, i).join('/')}`] || v
    }).join(' / ')
    
    //return `!!!${directory}!!!`
}

export default directoryLabel
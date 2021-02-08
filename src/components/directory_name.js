
import config from "../../config"

const DirectoryName = ( { directory } ) => {
    return config.directory_names[directory] || directory
}
export default DirectoryName
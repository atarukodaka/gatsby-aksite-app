
import config from "../../config"

const FolderName = ( { folder } ) => {
    return config.folder_names[folder] || folder
}
export default FolderName
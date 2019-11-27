package file.server;

import java.util.List;

/*
export interface Files {
    isDirectory: boolean;
    // child uris 
    children?: string[];
}
*/

public class MyFiles {

    private Boolean isDirectory;

    private List<String> children;

    public Boolean getIsDirectory() {
        return this.isDirectory;
    }

    public void setIsDirectory(final Boolean isDirectory) {
        this.isDirectory = isDirectory;
    }

    public List<String> getChlidren() {
        return this.children;
    }

    public void setChildren(List<String> children) {
        this.children = children;
    }

}
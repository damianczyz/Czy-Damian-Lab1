class Note {
    constructor(title, content, color) {
        this.title = title
        this.content = content
        this.date = new Date().toLocaleString()
        this.color = color
        this.id
        this.pinned = false
    }
}
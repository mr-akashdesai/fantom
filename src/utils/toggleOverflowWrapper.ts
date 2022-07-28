export const toggleOverflowWrapper = (id: string, buttonElement: string, containerHeight: string, closedText: string, openedText: string) => {
    const container = document.getElementById(id)
    const button = document.getElementById(buttonElement)

    if(container.style.height === '100%'){
        container.style.height = containerHeight
    } else {
        container.style.height = '100%'

    }   

    if(button.innerHTML === openedText){
        button.innerHTML = closedText
        button.scrollIntoView(false)
    } else {
        button.innerHTML = openedText
    }
}
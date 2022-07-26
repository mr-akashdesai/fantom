export const toggleOverflowWrapper = (id: string) => {
    const container = document.getElementById(id)
    const button = document.getElementById(`toggle-${id}`)

    if(container.style.height === '100%'){
        container.style.height = '50rem'
    } else {
        container.style.height = '100%'

    }   

    if(button.innerHTML === 'Less...'){
        button.innerHTML = 'More...'
        button.style.marginTop = '0'
        button.scrollIntoView(false)
    } else {
        button.innerHTML = 'Less...'
        button.style.marginTop = '1.5rem'
    }
}
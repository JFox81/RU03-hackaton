import {Module} from '../core/module'

export class CustomMessageModule extends Module {
    constructor() {
        super('message', 'кастомное сообщение');
    }

    trigger() {
        let message = document.createElement('div')
        message.textContent = "это кастомное сообщение!"
        message.style.fontSize = '17px'
        message.style.backgroundColor = 'black'
        message.style.color = 'white'
        message.style.width = '250px'
        message.style.height = '250px'
        message.style.border = '1px solid black'
        message.style.borderRadius = '10px'
        message.style.zIndex = '9999'
        message.style.padding = '10px'
        message.style.alignContent = 'center'

        message.style.display = 'flex'
        message.style.justifyContent = 'center'
        message.style.alignItems = 'center'

        message.style.position = 'fixed'
        message.style.bottom = `${Math.random() * 80 + 10}px`;
        message.style.right = `${Math.random() * 80 + 10}px`;

        document.body.appendChild(message)

        setTimeout(() => {
            message.remove()
        }, 3000)
    }

}

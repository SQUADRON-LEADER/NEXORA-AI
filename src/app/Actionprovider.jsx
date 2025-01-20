import OpenAI from 'openai';

const openai= new OpenAI({
    apiKey:'81534bdc0ef84362a1589d2ff0f8f769',
    baseURL:'https://api.aimlapi.com',
    dangerouslyAllowBrowser: true
})

class ActionProvider{
    createChatBotMessage
    setStateFunc
    createClientMessage
    createCustomMessage
    stateRef

    constructor(

        createChatBotMessage, 
        setStateFunc,
        createClientMessage, 
        stateRef,
        createCustomMessage,
        ...rest
    ){
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage;
        this.createCustomMessage = createCustomMessage;
        this.stateRef = stateRef;
     }

callGenAI=async(prompt)=>{
    const chatCompletion= await openai.chat.completions.create(
        {
            model:'chatgpt-4o-latest',
            messages:[
                {role: 'system',content: "You should best wishes for the proffessor"},
                {role: 'user',content: prompt}],
            temperature: 0.5,
            max_tokens: 100,
        }
    );
    return chatCompletion.choices[0].message.content;
}
timer=ms=>new Promise(res=>setTimeout(res,ms));

generateResponseMessage=async(userMessage)=>{
    const responseFromGPT=await this.callGenAI(userMessage);
    let message;
    let numberNoLines=responseFromGPT.split('\n').length;
    for (let i=0; i<numberNoLines; i++){
        const msg=responseFromGPT.split('\n')[i];
        if (msg.length){
            console.log('KW101',msg)
            message=this.createChatBotMessage(msg);
            this.updateChatBotMessage(message);
        }
        await this.timer(1000);

    }

}
respond =(message)=>{
    this.generateResponseMessage(message);
}
updateChatBotMessage=(message)=>{
    this.setState(prevState=>({
        ...prevState,messages:[...prevState.messages,message]
    }))
}
}

export default ActionProvider;
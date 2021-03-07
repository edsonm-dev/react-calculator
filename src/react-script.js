
const buttons = [
    {
        id:"zero",
        value:0,
        class:"number",
        gridarea:"zero"},
    {
        id:"one",
        value:1,
        class:"number",
        gridarea:"one"},
    {
        id:"two",
        value:2,
        class:"number",
        gridarea:"two"},
    {
        id:"four",
        value:4,
        class:"number",
        gridarea:"four"},
    {
        id:"three",
        value:3,
        class:"number",
        gridarea:"three"},
    {
        id:"five",
        value:5,
        class:"number",
        gridarea:"five"},
    {
        id:"six",
        value:6,
        class:"number",
        gridarea:"six"},
    {
        id:"seven",
        value:7,
        class:"number",
        gridarea:"seven"},
    {
        id:"eight",
        value:8,
        class:"number",
        gridarea:"eight"},
    {
        id:"nine",
        value:9,
        class:"number",
        gridarea:"nine"},
    {
        id:"add",
        value:"+",
        class:"operator",
        gridarea:"add"},
    {
        id:"multiply",
        value:"*",
        class:"operator",
        gridarea:"multiply"},
    {
        id:"divide",
        value:"/",
        class:"operator",
        gridarea:"divide"},
    {
        id:"subtract",
        value:"-",
        class:"operator",
        gridarea:"subtract"},
    {
        id:"clear",
        value:"AC",
        class:"clear",
        gridarea:"clear"},
    {
        id:"decimal",
        value:".",
        class:"number",
        gridarea:"decimal"},
    {
        id:"equals",
        value:"=",
        class:"operator",
        gridarea:"equals"}

] 

const inputPattern= /^((0|[1-9]+[0-9]*)(\.[0-9]*)?)$/;
const evalPattern=/^$/;





class App extends React.Component {
    constructor (props) {
        super(props);

    this.state={input:'0',
                formula:'',
                evaluated:false}
    this.handleNumbers=this.handleNumbers.bind(this);
    this.handleClear=this.handleClear.bind(this);
    this.handleOperators=this.handleOperators.bind(this);
    }
    
    handleNumbers(e){        
        
        let copiedState = Object.assign({},this.state);


        if(copiedState.evaluated==true){
            copiedState.evaluated=false
            copiedState.input='0';
        }

        let inputUpdate=''
        
        if(copiedState.input=='0' && String(e)=='.'){
            
            inputUpdate=copiedState.input.concat(String(e));
            console.log(inputUpdate);
        }else if(copiedState.input=='0' && String(e)!='.')
        {
            inputUpdate=String(e);
            console.log(inputUpdate);
        }else{
            inputUpdate=copiedState.input.concat(String(e));
        }
        
//test updater with pattern
        if(inputPattern.test(inputUpdate)){
            
            copiedState.input=inputUpdate;
                            

        } else {
        console.log(inputPattern.test(copiedState.input),copiedState.input);
        }

        this.setState(copiedState);


    }

    handleClear(e){
        console.log("clear")
        this.setState({input:'0',
                        formula:'',
                        evaluated:false});
    }
    handleOperators(e){
        
        let copiedState = Object.assign({},this.state);

        //if the last pressed button was a number or clear
        if(copiedState.evaluated==false){
            if(copiedState.formula.substring(copiedState.formula.length-1)=='='){
                copiedState.formula=copiedState.input.concat(e);

            }else{
                copiedState.formula+=copiedState.input;
                copiedState.input=String(eval(copiedState.formula))
                copiedState.formula+=e
            }
        //if the last pressed button was an operator    
        }else{
            
            if(copiedState.formula.substring(copiedState.formula.length-1)=='='){
                copiedState.formula=copiedState.input.concat(e);
            }else{ 
                if(e=='-' && copiedState.formula.substring(copiedState.formula.length-2)!=" -"){
                    
                    copiedState.formula+= " " + e;
                    
                }else if(copiedState.formula.substring(copiedState.formula.length-2)==" -"){
                    copiedState.formula=copiedState.formula.substring(0,copiedState.formula.length-3).concat(e)
                }else{
                    copiedState.formula=copiedState.formula.substring(0,copiedState.formula.length-1).concat(e);

                }
            }

        }

        copiedState.evaluated=true;
        
        
        this.setState(copiedState);

        console.log("operator");
        
    }


    render() {  
        
        let arr=[]
        for (x of buttons){
            
            
            let clickFunction=function(){};
            let num = x.value;            
            switch(x.class){

                    case "number":
                        clickFunction= this.handleNumbers;
                        break;
                    case "operator":
                        clickFunction= this.handleOperators;
                        break;
                    case "clear":
                        clickFunction= this.handleClear;
                        break;
                    }
                    
            arr.push(<div id={x.id} 
                            className={x.class} 
                            style={{gridArea:  x.gridarea }}
                            onClick={()=>clickFunction(num)}><p>{x.value}</p></div>)
               }

        return (<div className="calculator">
                    <Display value={this.state}/>
                    {arr}
                </div>);
    }
}

class Display extends React.Component {
    render(){


        return (
            <div id="input" style={{gridArea:"dplay"}}>
                <div id="formulaBar">{this.props.value.formula}</div>
                <div id="display">{this.props.value.input}</div>
            </div>
        )

    }
}

ReactDOM.render(<App />, document.getElementById("appContainer"));
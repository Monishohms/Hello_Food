const parent = React.createElement("div", {id:"div"} , 
                [ React.createElement("div", {id:"div1"}, [React.createElement("h1", {}, " Hi h1 tag is here!"), React.createElement("h2", {}, "Hi h2 tag is here !")]),
                React.createElement("div", {id:"div2"}, [React.createElement("h1", {}, " Hi h1 tag is here!"), React.createElement("h2", {}, "Hi h2 tag is here !")]) 
            ]);

console.log(parent); // object
const res = ReactDOM.createRoot(document.getElementById('root'));
res.render(parent);
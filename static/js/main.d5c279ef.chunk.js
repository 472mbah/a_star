(this.webpackJsonproute=this.webpackJsonproute||[]).push([[0],{10:function(e,t,n){e.exports=n(16)},16:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(8),i=n.n(o),c=n(1),s=n(2),u=n(4),l=n(3),d=n(5),p=n.n(d),h=n(9),_=function(e,t,n){for(var a=-1,r=0;r<t.length;r++)if(t[r].cords[0]==e[0]&&t[r].cords[1]==e[1]){a=r;break}return a},g=function(e,t,n){var a=e[1]-1>=0?[e[0],e[1]-1]:null,r=e[1]+1<t[1]?[e[0],e[1]+1]:null,o=e[0]+1<t[0]?[e[0]+1,e[1]]:null,i=e[0]-1>=0?[e[0]-1,e[1]]:null,c=[];if(null!=a&&c.push(a),null!=r&&c.push(r),null!=o&&c.push(o),null!=i&&c.push(i),n){var s=null!=a&&null!=o?[e[0]+1,e[1]-1]:null,u=null!=r&&null!=o?[e[0]+1,e[1]+1]:null,l=null!=a&&null!=i?[e[0]-1,e[1]-1]:null,d=null!=r&&null!=i?[e[0]-1,e[1]+1]:null;null!=s&&c.push(s),null!=u&&c.push(u),null!=l&&c.push(l),null!=d&&c.push(d)}return c},f=function e(t){if(t.length<=1)return t;var n=t.shift(),a=[],r=[];return t.forEach((function(e){e.weight<n.weight?a.push(e):r.push(e)})),e(a).concat(n,e(r))},m=function(e,t){return Math.sqrt(Math.pow(t[0]-e[0],2)+Math.pow(t[1]-e[1],2))},v={pythagros:m,quicksort:f,find_those_around_me:g,is_in_priority:_},b=(n(7),function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(e=t.call.apply(t,[this].concat(o))).state={priority_queue_raw:[[0,0]],route_queue:[],done_queue_raw:[],blocked_nodes:["05","14","23","32","43"],start_cords:[0,0],end_cord:[9,9],size:[10,10],speed:50,playing:!1,diag:!1},e.toggle_blocked_nodes=function(t,n){var a=e.state.blocked_nodes,r="".concat(t[0]).concat(t[1]);n?a.push(r):a=a.filter((function(e){return r!=e})),e.setState({blocked_nodes:a})},e.return_str_format=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=[];return e.forEach((function(e){t&&(e=e.cords),n.push("".concat(e[0]).concat(e[1]))})),n},e.timer=function(){return new Promise((function(t){setTimeout((function(){t()}),e.state.speed)}))},e.algorithm=Object(h.a)(p.a.mark((function t(){var n,a,r,o,i,c,s,u,l,d,h,_,g,f,m,b,k,y,E,w,x;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.setState({priority_queue_raw:[],route_queue:[],done_queue_raw:[],playing:!0}),n=v.pythagros,a=v.quicksort,r=v.find_those_around_me,o=v.is_in_priority,i=e.state,c=i.start_cords,s=i.end_cord,u=i.size,l=i.blocked_nodes,d=i.diag,h=c,_=[],g=[],f=[c],m=[{cords:c,weight:n(c,s),parent_index:null}],b=1,k=u[0]*u[1],y=!1,E=p.a.mark((function t(){var i,c,v;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.timer();case 2:i=(i=r(h,u,d)).filter((function(e){return-1==o(e,m,!0)&&-1==l.indexOf("".concat(e[0]).concat(e[1]))})),c=f.indexOf(h),i.forEach((function(e){var t=o(e,_);if(-1!=t){var a=_[t].weight,r=n(e,s),i=m[c].weight+r;i<a&&(_[t].weight=i,_[t].parent_index=c)}else _.push({cords:e,weight:1+m[c].weight,parent_index:c}),g.push(e)})),_=a(_),v=_.shift(),g.shift(),void 0!=v&&(m.push(v),f.push(v.cords),h=v.cords),h[0]==s[0]&&h[1]==s[1]&&(y=!0),b++,e.setState({priority_queue_raw:e.return_str_format(g),done_queue_raw:e.return_str_format(f)});case 13:case"end":return t.stop()}}),t)}));case 12:if(y||!(b<k)){t.next=16;break}return t.delegateYield(E(),"t0",14);case 14:t.next=12;break;case 16:if(w=[],!y){t.next=28;break}h=o(s,m);case 19:if(-1==h){t.next=28;break}return t.next=22,e.timer();case 22:x=m[h],w.push(x),h=null==x.parent_index?-1:x.parent_index,e.setState({route_queue:e.return_str_format(w,!0)}),t.next=19;break;case 28:e.setState({playing:!1});case 29:case"end":return t.stop()}}),t)}))),e.container_style=function(e){return{display:"grid",gridGap:"0px",gridTemplateColumns:"repeat(".concat(e,", 1fr)"),width:"fit-content",height:"fit-content",borderRadius:"10px"}},e.change_axis=function(t,n){var a=e.state,r=a.size;a.start_cords,a.end_cord;r[n]=t;var o=r[0]-1,i=r[1]-1;e.setState({size:r,start_cords:[0,0],end_cord:[o,i],blocked_nodes:[],priority_queue_raw:[],route_queue:[],done_queue_raw:[]})},e.change_cords=function(t,n,a){var r=e.state,o=r.start_cords,i=r.end_cord;a?(o[n]=t,e.setState({start_cords:o})):(i[n]=t,e.setState({end_cord:i}))},e.render_block=function(){for(var t=e.state,n=t.size,a=t.priority_queue_raw,o=t.done_queue_raw,i=t.route_queue,c=t.blocked_nodes,s=t.start_cords,u=t.end_cord,l=[],d=0;d<n[1];d++)for(var p=0;p<n[0];p++)l.push(r.a.createElement(y,{priority_queue_raw:a,radius:0==d&&0==p?0:0==d&&p==n[0]-1?1:0==p&&d==n[1]-1?3:d==n[1]-1&&p==n[0]-1?2:-1,toggle:e.toggle_blocked_nodes,blocked_nodes:c,start_cords:s,end_cord:u,done_queue_raw:o,route_queue:i,key:"".concat(d).concat(p),x:p,y:d}));return r.a.createElement("div",{className:"block_container_child",style:e.container_style(n[0])},l.map((function(e){return e})))},e.change_speed=function(t){e.setState({speed:t})},e.toggle_diag=function(){e.setState({diag:!e.state.diag})},e}return Object(s.a)(n,[{key:"render",value:function(){var e=this.state,t=e.playing,n=e.size,a=e.start_cords,o=e.end_cord,i=e.diag,c=e.speed;return r.a.createElement("div",{className:"block_container"},r.a.createElement(k,{speed:c,algorithm:this.algorithm,change_speed:this.change_speed,diag:i,toggle_diag:this.toggle_diag,start_cords:a,end_cord:o,playing:t,size:n,change_cords:this.change_cords,change_axis:this.change_axis}),this.render_block())}}]),n}(r.a.Component)),k=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={err:null,message:"Click on a cell to make it a barrier, the algorithm won't consider that block as a viable route. Click again to make it a regular cell.\n        The following video really helped to aid my understanding of the algorithms"},e.change_axis=function(t,n){isNaN(t)||""==t?(e.props.change_axis(2,n),e.setState({err:"Ensure integer input instead."})):(t=parseInt(t))<=14&&t>=2?(e.props.change_axis(t,n),e.setState({err:null})):e.setState({err:"Ensure appropiate values within range of 2 and 14 inclusive"})},e.change_cords=function(t,n,a){var r=e.props.size;isNaN(t)||""==t?(console.log("aqui",r[n]-1),e.props.change_cords(r[n]-1,n,a),e.setState({err:"Ensure integer input instead."})):(t=parseInt(t))<=r[n]&&t>=0?(e.props.change_cords(t,n,a),e.setState({err:null})):e.setState({err:"Ensure appropiate values within range of 0 and "+(r[n]-1)+" inclusive"})},e.change_speed=function(t){isNaN(t)||""==t?(e.props.change_speed(0),e.setState({err:"Ensure integer input instead."})):(t=parseInt(t))>=0&&t<=5e3?(e.props.change_speed(t),e.setState({err:null})):e.setState({err:"Ensure appropiate values within range of 0 and 5000ms inclusive"})},e}return Object(s.a)(n,[{key:"render",value:function(){var e=this,t=this.props,n=t.playing,a=t.start_cords,o=t.end_cord,i=t.size,c=t.diag,s=t.toggle_diag,u=t.speed,l=t.algorithm,d=this.state.message;return r.a.createElement("div",{id:"panel_container",className:"block_container_child"},r.a.createElement("h1",null,"Djikstra's / A* algorithm"),r.a.createElement("div",null,r.a.createElement("p",null,d),r.a.createElement("a",{href:"https://www.youtube.com/watch?v=ySN5Wnu88nE&t=428s"},"Youtube video by Computerphile")),r.a.createElement("div",null,r.a.createElement("h2",null,"Change dimensions"),r.a.createElement("input",{disabled:n,onChange:function(t){var n=t.target;return e.change_axis(n.value,0)},placeholder:"width - "+i[0]}),r.a.createElement("input",{disabled:n,onChange:function(t){var n=t.target;return e.change_axis(n.value,1)},placeholder:"height - "+i[1]})),r.a.createElement("div",null,r.a.createElement("h2",null,"Change start point"),r.a.createElement("input",{disabled:n,onChange:function(t){var n=t.target;return e.change_cords(n.value,0,!0)},placeholder:"start, x - "+a[0]}),r.a.createElement("input",{disabled:n,onChange:function(t){var n=t.target;return e.change_cords(n.value,1,!0)},placeholder:"start, y - "+a[1]})),r.a.createElement("div",null,r.a.createElement("h2",null,"Change end point"),r.a.createElement("input",{disabled:n,onChange:function(t){var n=t.target;return e.change_cords(n.value,0,!1)},placeholder:"end, x - "+o[0]}),r.a.createElement("input",{disabled:n,onChange:function(t){var n=t.target;return e.change_cords(n.value,1,!1)},placeholder:"end, y - "+o[1]})),r.a.createElement("div",null,r.a.createElement("button",{disabled:n,onClick:s},c?"Disable diagonal movement":"Enable diagonal movement")),r.a.createElement("div",null,r.a.createElement("h2",null,"Change animation speed"),r.a.createElement("input",{disabled:n,onChange:function(t){var n=t.target;return e.change_speed(n.value)},placeholder:"Anim speed - "+u}),r.a.createElement("p",null,this.state.err)),r.a.createElement("div",null,r.a.createElement("button",{disabled:n,onClick:l},"Play")))}}]),n}(a.Component),y=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={hover:!1,is_block:!1},e.block_style=function(t){var n=e.state.hover,a=[0,0,0,0];return a[e.props.radius]=15,{height:"3.5em",width:"3.5em",borderRadius:"".concat(a[0],"px ").concat(a[1],"px ").concat(a[2],"px ").concat(a[3],"px"),background:t,opacity:n?"0.4":"1",cursor:"pointer",color:"rgba(0, 0, 0, 0.4)",display:"flex",justifyContent:"center",alignItems:"center",fontSize:"0.8em",fontFamily:"'Roboto Condensed', sans-serif"}},e.determine_state=function(t,n){var a=e.props,r=a.priority_queue_raw,o=a.done_queue_raw,i=a.route_queue,c=a.blocked_nodes,s=a.start_cords,u=a.end_cord,l="".concat(t).concat(n);return-1!=c.indexOf(l)?"#000":-1!=i.indexOf(l)?"#82DC3C":s[0]==t&&s[1]==n?"#CFA81D":u[0]==t&&u[1]==n?"#EF4338":-1!=r.indexOf(l)?"#2E642A":-1!=o.indexOf(l)?"#4B831F":"#f3f3f3"},e.clicked_block=function(t,n){var a=e.state.is_block;a=!a,e.setState({is_block:a}),e.props.toggle([t,n],a)},e}return Object(s.a)(n,[{key:"render",value:function(){var e=this,t=this.props,n=t.x,a=t.y;return r.a.createElement("div",{onMouseEnter:function(){return e.setState({hover:!0})},onMouseLeave:function(){return e.setState({hover:!1})},onClick:function(){return e.clicked_block(n,a)},style:this.block_style(this.determine_state(n,a))},n,", ",a)}}]),n}(a.Component),E=b,w=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(s.a)(n,[{key:"render",value:function(){return r.a.createElement("div",{className:"home"},r.a.createElement(E,null))}}]),n}(r.a.Component);i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w,null)),document.getElementById("root"))},7:function(e,t,n){}},[[10,1,2]]]);
//# sourceMappingURL=main.d5c279ef.chunk.js.map
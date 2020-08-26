import React, { Component } from 'react';
import functions from './djik_algorithm';
import './style.css';

class App extends React.Component {

    state = {
        priority_queue_raw:[[0, 0]],
        route_queue: [],
        done_queue_raw:[],
        blocked_nodes: ['05', '14', '23', '32', '43'],
        start_cords:[0, 0],
        end_cord:[9, 9],
        size: [10, 10],
        speed:50, 
        playing:false,
        diag:false,
    }

    toggle_blocked_nodes = (cords, toggle) => {
        let { blocked_nodes } = this.state;
        const id = `${cords[0]}${cords[1]}`;
        if(toggle)
            blocked_nodes.push(id);
        else 
            blocked_nodes = blocked_nodes.filter(item=>{
                return id != item
            })
        this.setState({blocked_nodes})
    }

    return_str_format = (arr, obj=false) => {
        let output = [];
        arr.forEach(item=>{
            if(obj){
                item = item.cords
            }
            output.push(`${item[0]}${item[1]}`)
        })
        return output;
    }

    timer = () => {
        return new Promise(res => {
            setTimeout(() => {
                res();
            }, this.state.speed);
        });
    }

    algorithm = async () => {
        this.setState({priority_queue_raw:[], route_queue:[], done_queue_raw:[], playing:true})
        const { pythagros, quicksort, find_those_around_me, is_in_priority } = functions;
        const { start_cords, end_cord, size, blocked_nodes, diag } = this.state;
        let current_cord = start_cords;
        let priority_queue = [];
        let priority_queue_raw = [];
        let done_queue_raw = [start_cords];
        let done_queue = [{cords:start_cords, weight:pythagros(start_cords, end_cord), parent_index:null}];
        let iteration_number = 1;
        const max_number_of_traversals = size[0] * size[1];
        let target_found = false;

        while (!target_found && iteration_number < max_number_of_traversals) {
            await this.timer()

            let around_current_node = find_those_around_me(current_cord, size, diag);
            
            around_current_node = around_current_node.filter(temp_node=>{
                return is_in_priority(temp_node, done_queue, true) == -1 && blocked_nodes.indexOf(`${temp_node[0]}${temp_node[1]}`) == -1 ;
            })
            const parent_cords_index = done_queue_raw.indexOf(current_cord);
    
            around_current_node.forEach(node=>{
    
                    const priority_index = is_in_priority(node, priority_queue)
                    if(priority_index!=-1){
                        const existing_weight = priority_queue[priority_index].weight;
                        const pyth = pythagros(node, end_cord);
                        const new_weight = done_queue[parent_cords_index].weight + (pyth);
                        if(new_weight < existing_weight ){
                            priority_queue[priority_index].weight = new_weight;
                            priority_queue[priority_index].parent_index = parent_cords_index;
                        }
                    }else {
                        priority_queue.push({ cords:node, weight:1+done_queue[parent_cords_index].weight, parent_index:parent_cords_index });
                        priority_queue_raw.push(node)
                    }
    
            });
            priority_queue = quicksort(priority_queue);
            const new_cord_first = priority_queue.shift();
            priority_queue_raw.shift();
            if(new_cord_first!=undefined){
                done_queue.push(new_cord_first);
                done_queue_raw.push(new_cord_first.cords);
                current_cord = new_cord_first.cords;    
            }
            if(current_cord[0]==end_cord[0] && current_cord[1]==end_cord[1]){
                target_found = true;
            }
            
            iteration_number++;
                this.setState({priority_queue_raw:this.return_str_format(priority_queue_raw),
                     done_queue_raw:this.return_str_format(done_queue_raw)});
                     
              

        }
        let output = [];
        if(target_found){
            
            current_cord = is_in_priority(end_cord, done_queue);
            while(current_cord!=-1){
                await this.timer()
                let node = done_queue[current_cord];
                output.push(node);
                current_cord = node.parent_index == null ? -1 : node.parent_index;
                this.setState({route_queue:this.return_str_format(output, true)});

            }    
        }

        this.setState({playing:false})
        
    }

    container_style = columns => ({
        display:'grid', 
        gridGap:'0px', gridTemplateColumns:`repeat(${columns}, 1fr)`,
        width:`fit-content`,
        height:'fit-content',
        borderRadius:'10px',
    })  

    change_axis = (value, axis) => {
        let { size, start_cords, end_cord } = this.state;

        size[axis] = value;
        const limit = size[0]-1;
        const limit_y = size[1]-1;
        this.setState({size, start_cords:[0, 0], end_cord:[limit, limit_y],
             blocked_nodes:[], priority_queue_raw:[], route_queue:[], done_queue_raw:[]}) 
    }

    change_cords = (value, axis, start) => {
        let { start_cords, end_cord } = this.state;
        if(start){
            start_cords[axis] = value;
            this.setState({start_cords})
        }
        else{
            end_cord[axis] = value;
            this.setState({end_cord})
        } 
    }

    render_block = () => {
        const { size, priority_queue_raw, done_queue_raw, route_queue, blocked_nodes, start_cords, end_cord } = this.state;
        let table = [];


        for(let a = 0; a < size[1]; a++){
            for(let b = 0; b < size[0]; b++){
                table.push(<Block priority_queue_raw={priority_queue_raw}
                    radius={a==0 && b==0? 0:a==0 && b==size[0]-1 ? 1 : b==0 && a==size[1]-1 ? 3 : a==size[1]-1 && b==size[0]-1 ? 2 : -1 }
                    toggle={this.toggle_blocked_nodes}
                    blocked_nodes={blocked_nodes}
                    start_cords={start_cords}
                    end_cord={end_cord}
                    done_queue_raw={done_queue_raw} route_queue={route_queue} key={`${a}${b}`} x={b} y={a} />);
            }
        }
      
        return (
            <div className="block_container_child" style={this.container_style(size[0])}>{ table.map(item=>item)}</div>
        )
        
    }

    change_speed = speed => {
        this.setState({speed})
    }

    toggle_diag = () => {
        this.setState({diag:!this.state.diag})
    }

    render(){
        const { playing, size, start_cords, end_cord, diag, speed } = this.state; 
        return(
            <div className="block_container">
                <Panel 
                speed={speed}
                algorithm={this.algorithm}
                change_speed={this.change_speed}
                diag={diag}
                toggle_diag={this.toggle_diag}
                start_cords={start_cords} 
                end_cord={end_cord} playing={playing} 
                size={size} change_cords={this.change_cords} change_axis={this.change_axis}/>
                { this.render_block() }

            </div>
        )
    }

}

class Panel extends Component {

    state = {
        err:null,
        message:`Click on a cell to make it a barrier, the algorithm won't consider that block as a viable route. Click again to make it a regular cell.
        The following video really helped to aid my understanding of the algorithms`
    }


    change_axis = (value, axis) => {
        if(!isNaN(value) && value!=""){
            value = parseInt(value)
            if(value<=14 && value >= 2){
                this.props.change_axis(value, axis)
                this.setState({err:null})
            }
            else {
                this.setState({err:"Ensure appropiate values within range of 2 and 14 inclusive"})
            }  
        }else {
            this.props.change_axis(2, axis)
            this.setState({err:"Ensure integer input instead."})
        }
    } 

    change_cords = (value, axis, start) => {
        const { size } = this.props;
        if(!isNaN(value) && value!=""){
            value = parseInt(value)
            if(value<=size[axis] && value >= 0){
                this.props.change_cords(value, axis, start)
                this.setState({err:null})
            }else {
                this.setState({err:"Ensure appropiate values within range of 0 and "+(size[axis]-1)+" inclusive"})
            } 
        }else {
            console.log("aqui", size[axis]-1)
            this.props.change_cords(size[axis]-1, axis, start)
            this.setState({err:"Ensure integer input instead."})
        }
    }

    change_speed = (value) => {
        if(!isNaN(value) && value!=""){
            value = parseInt(value)
            if(value>=0 && value <= 5000){
                this.props.change_speed(value)
                this.setState({err:null})
            }else {
                this.setState({err:"Ensure appropiate values within range of 0 and 5000ms inclusive"})
            } 
        }else {
            this.props.change_speed(0)
            this.setState({err:"Ensure integer input instead."})
        }
    }   

    render(){
        const { playing, start_cords, end_cord, size, diag, toggle_diag, speed, algorithm } = this.props; 
        const { message } = this.state;
        return(
            <div id="panel_container" className="block_container_child" >

                <h1>Djikstra's / A* algorithm</h1>


                <div>
                    <p>{message}</p>
                    <a href="https://www.youtube.com/watch?v=ySN5Wnu88nE&t=428s">Youtube video by Computerphile</a>
                </div>

                <div>
                    <h2>Change dimensions</h2>
                    <input disabled={playing} onChange={({target})=>this.change_axis(target.value, 0)} placeholder={"width - "+size[0]} />
                    <input disabled={playing} onChange={({target})=>this.change_axis(target.value, 1)} placeholder={"height - "+size[1]}/>
                </div>

                <div>
                    <h2>Change start point</h2>
                    <input disabled={playing} onChange={({target})=>this.change_cords(target.value, 0, true)} placeholder={"start, x - "+start_cords[0]}/>
                    <input disabled={playing} onChange={({target})=>this.change_cords(target.value, 1, true)} placeholder={"start, y - "+start_cords[1]}/>
                </div>

                <div>
                    <h2>Change end point</h2>
                    <input disabled={playing} onChange={({target})=>this.change_cords(target.value, 0, false)} placeholder={"end, x - "+end_cord[0]}/>
                    <input disabled={playing} onChange={({target})=>this.change_cords(target.value, 1, false)} placeholder={"end, y - "+end_cord[1]}/>
                </div>

                <div>
                    <button disabled={playing} onClick={toggle_diag}>{diag ? "Disable diagonal movement":"Enable diagonal movement"}</button>
                </div>

                <div>
                    <h2>Change animation speed</h2>
                    <input disabled={playing} onChange={({target})=>this.change_speed(target.value)} placeholder={"Anim speed - "+speed}/>
                    <p>{this.state.err}</p>
                </div>

                <div>
                    <button disabled={playing} onClick={algorithm}>Play</button>
                </div>

            </div>
        )
    }
}

class Block extends Component {

    state = {
        hover:false,
        is_block:false,
    }

    block_style = state => {
        const { hover } = this.state;
        const { radius } = this.props;

        let arr = [0, 0, 0, 0];
        arr[radius] = 15;

        return  {
            height:'3.5em',
            width:'3.5em',
            borderRadius:`${arr[0]}px ${arr[1]}px ${arr[2]}px ${arr[3]}px`,
            background:state,
            opacity:hover ? '0.4' : '1',
            cursor:'pointer',
            color:'rgba(0, 0, 0, 0.4)',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            fontSize:'0.8em',
            fontFamily:`'Roboto Condensed', sans-serif`,

        }
    }     

    determine_state = (x, y) => {
        const { priority_queue_raw, done_queue_raw, route_queue, blocked_nodes, start_cords, end_cord } = this.props;
        // console.log(priority_queue_raw.includes())
           
        
        
        const id = `${x}${y}`;

        if(blocked_nodes.indexOf(id)!=-1)
            return '#000';

        if(route_queue.indexOf(id)!=-1)
            return '#82DC3C';

        if(start_cords[0]==x && start_cords[1]==y)
            return '#CFA81D'
        
        if(end_cord[0]==x && end_cord[1]==y)
            return '#EF4338' 

        if(priority_queue_raw.indexOf(id)!=-1)
            return '#2E642A';
        
        if(done_queue_raw.indexOf(id)!=-1) 
            return '#4B831F';
        else 
            return '#f3f3f3';
        
    }

    clicked_block = (x, y) => {
        let { is_block } = this.state;
        is_block = !is_block;
        this.setState({is_block});
        this.props.toggle([x, y], is_block);
    }

    render(){

        const { x, y } = this.props;

        return(
            <div 
            onMouseEnter={()=>this.setState({hover:true})}
            onMouseLeave={()=>this.setState({hover:false})}
        onClick={()=>this.clicked_block(x, y)} style={this.block_style(this.determine_state(x, y))}>
            {x}, {y}
        </div>
        )
    }
}
export default App;

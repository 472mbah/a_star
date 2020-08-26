const algorithm = (size, start_cords, end_cord) => {

    //size will be the width and height of our grid
    //start and end cords will both be arrays representing the x and y cords
    
    let current_cord = start_cords;
    let sum_of_weights = 0; 
    let priority_queue = [];
    let done_queue_raw = [start_cords];
    let done_queue = [{cords:start_cords, weight:pythagros(start_cords, end_cord), parent_index:null}];
    let iteration_number = 1;
    const max_number_of_traversals = size[0] * size[1];
    let target_found = false;
    // const max_number_of_traversals = 3;
    //priority_que is an array which will store each entity as they are being tracked  
    //entity formated as { cords:null, weight:1, parent_index:null }
    // console.log("\n")
    while (!target_found && iteration_number < max_number_of_traversals) {
        // console.log(iteration_number, "::done::", done_queue, "::prio::", priority_queue)
        let around_current_node = find_those_around_me(current_cord, size);
        // console.log(current_cord)
        
        around_current_node = around_current_node.filter(temp_node=>{
            return is_in_priority(temp_node, done_queue, true) == -1;
        })
        const parent_cords_index = done_queue_raw.indexOf(current_cord);

        around_current_node.forEach(node=>{

            //check if this node has already been accounted for, else generate and add to priority queue
            // console.log(parent_cords_index,done_que_index );
                //This node has not been accounted for yet since it is not completely the done_que list
                const priority_index = is_in_priority(node, priority_queue)
                if(priority_index!=-1){
                    //it is in the priority queue so evaluate weight and change parent if necesarry  
                    const existing_weight = priority_queue[priority_index].weight;
                    const pyth = pythagros(node, end_cord);
                    // console.log(pyth)
                    const new_weight = done_queue[parent_cords_index].weight + (pyth);
                    if(new_weight < existing_weight ){
                        priority_queue[priority_index].weight = new_weight;
                        priority_queue[priority_index].parent_index = parent_cords_index;
                    }
                }else {

                    //generate a new node for these co-ordinates
                    priority_queue.push({ cords:node, weight:1+done_queue[parent_cords_index].weight, parent_index:parent_cords_index });
                }

        });
        priority_queue = quicksort(priority_queue);
        const new_cord_first = priority_queue.shift();
        if(new_cord_first!=undefined){
            done_queue.push(new_cord_first);
            done_queue_raw.push(new_cord_first.cords);
            current_cord = new_cord_first.cords;    
        }
        if(current_cord[0]==end_cord[0] && current_cord[1]==end_cord[1]){
            target_found = true;
        }

        iteration_number++;
    }
    console.log(target_found)
    let output = [];
    if(target_found){
        
        current_cord = is_in_priority(end_cord, done_queue);
        while(current_cord!=-1){
            let node = done_queue[current_cord];
            output.push(node);
            current_cord = node.parent_index == null ? -1 : node.parent_index;
        }
        

        console.log(output)
    }
    


}

const is_in_priority = (cords, priority, pr) => {
    let found = -1;

    for(let a = 0; a < priority.length; a++){
        
        if(priority[a].cords[0]==cords[0] && priority[a].cords[1]==cords[1]){
            found = a;
            break;
        }
    }

    return found;
}

const  find_those_around_me = (current_cord, size, allow_diag) => { 

    let top = (current_cord[1] - 1) >= 0 ? [ current_cord[0], current_cord[1] - 1 ] : null;  
    let bottom = (current_cord[1] + 1) < size[1] ? [ current_cord[0], current_cord[1] + 1 ] : null;  
    let right = (current_cord[0] + 1) < size[0] ? [ current_cord[0] + 1, current_cord[1] ] : null;  
    let left = (current_cord[0] - 1) >= 0 ? [ current_cord[0] - 1, current_cord[1] ] : null;  

    let output = [];
    if(top!=null)
        output.push(top);
    if(bottom!=null)
        output.push(bottom);
    if(right!=null)
        output.push(right);
    if(left!=null)
        output.push(left);


    if(allow_diag){
        let diag_top_right = top != null && right != null ? [ current_cord[0]+1, current_cord[1]-1 ] : null;
        let diag_bottom_right = bottom != null && right != null ? [ current_cord[0]+1, current_cord[1]+1 ] : null;
        let diag_top_left = top != null && left != null ? [ current_cord[0]-1, current_cord[1]-1 ] : null;
        let diag_bottom_left = bottom != null && left != null ? [ current_cord[0]-1, current_cord[1]+1 ] : null;
    
        if(diag_top_right!=null)
            output.push(diag_top_right);        
        if(diag_bottom_right!=null)
            output.push(diag_bottom_right);        
        if(diag_top_left!=null)
            output.push(diag_top_left);        
        if(diag_bottom_left!=null)
            output.push(diag_bottom_left);        
    
    }
    return output;

}

const quicksort = array => {
    if (array.length <= 1) 
      return array;
    
  
    const pivot = array.shift();
    
    let left = []; 
    let right = [];
    
    array.forEach(item=>{
        item.weight < pivot.weight ? left.push(item) : right.push(item)  
    })
  
    return quicksort(left).concat(pivot, quicksort(right));
  };

const pythagros = (current, dest) => {
    return Math.sqrt(Math.pow(dest[0] - current[0], 2) + Math.pow(dest[1] - current[1], 2));  
}
  

export default { pythagros, quicksort, find_those_around_me, is_in_priority }
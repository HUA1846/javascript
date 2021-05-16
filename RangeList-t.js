// your code goes here
class RangeList {

    constructor() {
        this.rangeList = [];
        this.isInRange = [];
    } 

    /**
     * Adds a range to the list
     * @param {Array<number>} range - Array of two integers that specify
        beginning and end of range.
    */
    isValidRange(range) {
        return (range.length === 2 && range[0] >= 0 && range[1] >= 0 && range[0] <= range[1]); 
            
    }

    hasOverlap(start, end) {
       let overlap = false;
        for(let i = 0; i < this.rangeList.length; i++) {
            for(let j = this.rangeList[i][0]; j <= this.rangeList[i][1]; j++) {
                if(start === j || end === j) {
                    overlap = true;
                    break;
                }
            }
        }
        return overlap;
    }
        

    updateRange(start, end) {
    	console.log(`start=${start}, end=${end}`);
        if(start === end) return;
        if((!this.isInRange[start] && !this.isInRange[end]) || (this.isInRange[start] && this.isInRange[end])) {
            for(let i = start; i < end; i++) {
            this.isInRange[i] = true;
            }
            this.mergeRange();
            return;
        }
        if(!this.isInRange[start] && this.isInRange[end]) {
        	console.log('update start')
            for(let j = 0; j < this.rangeList.length; j++) {
                if(this.rangeList[j][0] <= end && end <= this.rangeList[j][1]) {
                    this.rangeList[j][0] = start;
                }
            }
        }
        if(this.isInRange[start] && !this.isInRange[end]) {
        	console.log('update end')
            for(let j = 0; j < this.rangeList.length; j++) {
                if(this.rangeList[j][0] <= start) {
                    this.rangeList[j][1] = end;
                }
            }   
        }
        for(let i = start; i < end; i++) {
            this.isInRange[i] = true;
        }
        
        
    }
    mergeRange() {
        console.log('merge')
        let flag = false;
        this.rangeList = [];
        let range = [];

        for(let i = 0; i < this.isInRange.length; i++) {
            if(this.isInRange[i] && !flag) {
                range[0] = i;
                flag = true;
                continue;
            }
            if((!this.isInRange[i] || i === this.isInRange.length - 1) && flag) {
                if(i === this.isInRange.length - 1) {
                    range[1] = i+1;
                } else {
                    range[1] = i;
                }
                this.rangeList.push(range);
                flag = false;
                range = [];
            }

        }
    }

    insertRange(range) {
        let start = range[0];
        for(let i = 0; i < this.rangeList.length; i++) {
            if(start > this.rangeList[i][1]) {
                this.rangeList.splice(i+1, 0, range);
            }
        }
        for(let i = range[0]; i < range[1]; i++) {
            this.isInRange[i] = true;
        }
    }


    add(range) {
    // TODO: implement this
        if(!this.isValidRange(range)) {
            return;
        }
        let start = range[0];
        let end = range[1];

        if(this.rangeList.length === 0) {
            this.rangeList.push(range);
            for(let i = start; i < end; i++) {
                this.isInRange[i] = true;
            }
            return;
        }
        let overlap = this.hasOverlap(start, end);
        if(!overlap) {
            this.insertRange(range);
        } else {
            this.updateRange(start, end);
        }
       
    }

    
    /**
     * Removes a range from the list
     * @param {Array<number>} range - Array of two integers that specify
       beginning and end of range.
    */
    remove(range) {
        // TODO: implement this

        if(!this.isValidRange(range)) {
            return;
        }
        let start = range[0];
        let end = range[1];

        console.log('remove', 'start=', start, 'end=', end);
        let overlap = this.hasOverlap(start, end);
        if(!overlap) return;

//         if(start === end && this.isInRange[start]) return;

        for(let i = start; i < end; i++) {
            this.isInRange[i] = false;
        }
        this.mergeRange();
    }


    /**
    * Prints out the list of ranges in the range list
    */
    print() {
    // TODO: implement this
        let s = "";
        for(let i = 0; i < this.rangeList.length; i++) {
            s += `[${this.rangeList[i][0]}, ${this.rangeList[i][1]}) `
        }
        console.log(s);

    }
	
	
}

    let r = new RangeList();
	r.add([1, 5]);
	r.print();
	// Should display: [1, 5)
	r.add([10, 20]);
	r.print();
	// Should display: [1, 5) [10, 20)
	r.add([20, 20]);
	r.print();
	// Should display: [1, 5) [10, 20)
	r.add([20, 21]);
	r.print();
	// Should display: [1, 5) [10, 21)
	r.add([2, 4]);
	r.print();
	// Should display: [1, 5) [10, 21)
	r.add([3, 8]);
	r.print();
	// Should display: [1, 8) [10, 21)
	r.remove([10, 10]);
	r.print();
	// Should display: [1, 8) [10, 21)
	r.remove([10, 11]);
	r.print();
	// Should display: [1, 8) [11, 21)
	r.remove([15, 17]);
	r.print();
	// Should display: [1, 8) [11, 15) [17, 21)
	r.remove([3, 19]);
	r.print();
	// Should display: [1, 3) [19, 21)
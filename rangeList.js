module.exports = class RangeList {
    constructor() {
        /** @private @const {Array<Array<number>>} rangeList -*/
        this.rangeList = [];

        /** @private @const {Array<boolean>} isInRange */
        this.isInRange = [];
    } 


    /**
     * Adds a range to the list
     * @param {Array<number>} range - Array of two integers that specify
     * start and end of a range
     * @return this.rangeList - updated rangeList or undefined if range not valid
    */
    add(range) {
        if(!this.isValidRange(range)) {
        	console.log('range is not valid');
            return undefined;
        }
        let start = range[0];
        let end = range[1];

        if(start === end) return this.rangeList;;

        if(this.rangeList.length === 0) {
            this.rangeList.push(range);
            for(let i = start; i < end; i++) {
                this.isInRange[i] = true;
            }
            return this.rangeList;
        }
        let overlap = this.hasOverlap(start, end);
        if(!overlap) {
            this.insertRange(range);
        } else {
            this.updateRange(start, end);
        }
        return this.rangeList;
    }


    /**
     * Removes a range from the list
     * @param {Array<number>} range - Array of two integers that specify
       beginning and end of range.
       @return this.rangeList - updated rangeList or undefined if range not valid
    */
    remove(range) {
        if(!this.isValidRange(range)) {
        	console.log('range is not valid');
            return undefined;
        }
       
        let start = range[0];
        let end = range[1];
        let overlap = this.hasOverlap(start, end);
        if(!overlap) return this.rangeList;;

        for(let i = start; i < end; i++) {
            this.isInRange[i] = false;
        }
        this.mergeRange();
        return this.rangeList;
    }


    /**
     * Check if a range is valid, i.e. Array of two integers that
     * specify beginning and end of range.
     * @param {Array<number>} range - Array of two integers that specify
     * start and end of a range.
     * @return {boolean}
    */
    isValidRange(range) {
        return (range.length === 2 && range[0] >= 0 && range[1] >= 0 && range[0] <= range[1]);         
    }


    /**
     * Check if a new range overlaps the original ranges
     * @param {integer} start - start of a range
     * @param {integer} end - end of a range
     * @return {boolean}
    */
    hasOverlap(start, end) {
       let overlap = false;
       for(let i = start; i < end; i++) {
        	if(this.isInRange[i]) {
        		overlap = true;
        		break;
        	}
       }
       for(let i = 0; i < this.rangeList.length; i++) {
            let rangeEnd = this.rangeList[i][1];
            if(start === rangeEnd) {
                overlap = true;
                break;
            }
       }
       return overlap;
    }
        

    /**
     * Update the original ranges with the new range
     * @param {integer} start - start of a range
     * @param {integer} end - end of a range
    */
    updateRange(start, end) {
        if((!this.isInRange[start] && !this.isInRange[end]) || (this.isInRange[start] && this.isInRange[end])) {
            for(let i = start; i < end; i++) {
            this.isInRange[i] = true;
            }
            return this.mergeRange();
        }

        // update start
        if(!this.isInRange[start] && this.isInRange[end]) {
            for(let j = 0; j < this.rangeList.length; j++) {
                if(this.rangeList[j][0] <= end && end <= this.rangeList[j][1]) {
                    this.rangeList[j][0] = start;
                }
            }
        }

        // update end
        if(this.isInRange[start] && !this.isInRange[end]) {
            for(let j = 0; j < this.rangeList.length; j++) {
                if(this.rangeList[j][0] <= start && this.rangeList[j][1] >= start) {
                    this.rangeList[j][1] = end;
                }
            }   
        }
        for(let i = start; i < end; i++) {
            this.isInRange[i] = true;
        }
    }


    /**
     * Merge the new ranges in rangeList according
     * to the updated isInRange boolean values
    */
    mergeRange() {
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
        return this.rangeList;
    }


    /**
     * Insert a new range to rangeList according to
     * the natural oder of Integers (ascending)
     * @param {Array<number>} - a range represented by an array
    */
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


    /**
    * Prints out the list of ranges in the range list
    */
    print() {
        let s = "";
        for(let i = 0; i < this.rangeList.length; i++) {
            s += `[${this.rangeList[i][0]}, ${this.rangeList[i][1]}) `
        }
        console.log(s);
        return s;
    }
}
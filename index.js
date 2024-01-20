const numberRange=document.querySelector("#numbers");
const display=document.querySelector(".display");
const speedRange=document.querySelector("#speed");
let length=50;
let min=10;
let max=80;
let arr=[];
let delay=10;
numberRange.addEventListener("click",()=>{
    document.getElementById("numbersSelected").innerHTML=numberRange.value+" Elements";
    length=numberRange.value;
    createArray();
})
speedRange.addEventListener("click",()=>{
    document.getElementById("speedSelected").innerHTML=(speedRange.value)+" ms";
    delay=(speedRange.value);
})
function createArray(){
    arr=[];
    for(let i=0;i<length;i++){
        arr.push(parseInt(Math.random()*(max-min)+min));
    }
    display.innerHTML="";
    for(let i=0;i<length;i++){
        const div=document.createElement("div");
        div.setAttribute("id",""+i+"");
        div.setAttribute("class","heights");
        div.style.height=""+arr[i]+"%";
        display.appendChild(div);
    }
    console.log(arr);
}
createArray();
document.querySelector(".bubbleSort").addEventListener("click",async ()=>{
    let temp=arr;
    for(let i=0;i<temp.length;i++){
        let count=0;
        for(let j=0;j<temp.length-i-1;j++){
            document.getElementById(j).style.background="blue";
            document.getElementById(j+1).style.background="blue";
            if(j!=0){
                document.getElementById(j-1).style.background="black";
            }
            await wait(delay);
            if(temp[j]>temp[j+1]){
                temp[j]+=temp[j+1];
                temp[j+1]=temp[j]-temp[j+1];
                temp[j]-=temp[j+1];
                document.getElementById(j).style.height=temp[j]+"%";
                document.getElementById(j+1).style.height=temp[j+1]+"%";
            }else{
                count++;
            }
        }
        if(temp.length-2-i>=0){
            document.getElementById(temp.length-2-i).style.background="black";
        }
        document.getElementById(temp.length-1-i).style.background="green";
    }
})
document.querySelector(".insertionSort").addEventListener("click", async ()=>{
    let i, key, j;
    for (i = 1; i < arr.length; i++) {
        key = arr[i];
        document.getElementById(i).style.background="red";
        j = i - 1;
        while (j >= 0 && arr[j] > key) {
            await wait(delay);
            arr[j + 1] = arr[j];
            document.getElementById(j+1).style.height=arr[j+1]+"%";
            j = j - 1;
            wait(delay);
        }
        arr[j + 1] = key;
        document.getElementById(i).style.background="black";
        document.getElementById(i-1).style.background="green";
        document.getElementById(j+1).style.height=arr[j+1]+"%";
    }
    document.getElementById(arr.length-1).style.background="green";
})
document.querySelector(".selectionSort").addEventListener("click", async ()=>{
    let i, j, min_idx; 
    let n=arr.length;
    for (i = 0; i < n - 1; i++) {  
        min_idx = i; 
        for (j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) 
                min_idx = j; 
        }
        document.getElementById(min_idx).style.background="red";
        document.getElementById(i).style.background="red";
        await wait(delay);
        if (min_idx != i){
            arr[min_idx]+=arr[i];
            arr[i]=arr[min_idx]-arr[i];
            arr[min_idx]=arr[min_idx]-arr[i];
        }
        console.log(arr);
        document.getElementById(min_idx).style.height=arr[min_idx]+"%";
        document.getElementById(i).style.height=arr[i]+"%";
        document.getElementById(min_idx).style.background="black";
        document.getElementById(i).style.background="green";
    }
    document.getElementById(i).style.background="green";
})
function wait(delay){
    return new Promise(resolve=>{
        setTimeout(()=>{resolve('')},delay);
    })
}
document.querySelector(".mergeSort").addEventListener("click", async ()=>{
    mergeSort(arr, 0, arr.length-1);
})
async function merge(arr, l, m, r){
	let n1 = m - l + 1;
	let n2 = r - m;
	let L = new Array(n1); 
	let R = new Array(n2);
	for (let i = 0; i < n1; i++){
        await wait(delay);
        document.getElementById(l+i).style.background="blue";
        document.getElementById(l+i).style.height=arr[l+i]+"%";
        L[i] = arr[l + i];
    }
	for (let j = 0; j < n2; j++){
        await wait(delay);
        document.getElementById(m+1+j).style.background="cyan";
        document.getElementById(m + 1 + j).style.height=arr[m + 1 + j]+"%";
        R[j] = arr[m + 1 + j];
    }
    await wait(delay);
	let i = 0;
	let j = 0;
	let k = l;
	while (i < n1 && j < n2){
		if (L[i] <= R[j]){
			arr[k] = L[i];
			i++;
		}
		else {
			arr[k] = R[j];
			j++;
		}
		k++;
	}
	while (i < n1){
		arr[k] = L[i];
		i++;
		k++;
	}
	while (j < n2){
		arr[k] = R[j];
		j++;
		k++;
	}
    for(i=l;i<=r;i++){
        await wait(delay);
        document.getElementById(i).style.height=arr[i]+"%";
        document.getElementById(i).style.background="green";
    }
}
async function mergeSort(arr,l, r){
	if(l>=r){
		return;
	}
	let m =l+ parseInt((r-l)/2);
	await mergeSort(arr,l,m);
	await mergeSort(arr,m+1,r);
	await merge(arr,l,m,r);
}

async function partition(arr, low, high) {
	let pivot = arr[high];
	let i = low - 1;
	document.getElementById(high).style.background="blue";
	for (let j = low; j <= high - 1; j++) {
		await wait(delay);
		if (arr[j] < pivot) {
			i++;
			document.getElementById(j).style.background="yellow";
			await wait(delay);
			[arr[i], arr[j]] = [arr[j], arr[i]];
			document.getElementById(i).style.height=arr[i]+"%";
			document.getElementById(j).style.height=arr[j]+"%";
			if(i!=j){
				document.getElementById(i).style.background="yellow";
				document.getElementById(j).style.background="pink";
			}
		}else{
			document.getElementById(j).style.background="pink";
		}
	}
	
	[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
	document.getElementById(i+1).style.height=arr[i+1]+"%";
	document.getElementById(high).style.height=arr[high]+"%";
	document.getElementById(i+1).style.background="green";
	for(let k=0;k<arr.length;k++){
		if(document.getElementById(k).style.background!="green"){
			document.getElementById(k).style.background="black";
		}
	}
	return i + 1;
}

// The main function that implements QuickSort
async function quickSort(arr, low, high) {
	if (low < high) {
		// pi is the partitioning index, arr[pi] is now at the right place
		let pi = await partition(arr, low, high);

		// Separately sort elements before partition and after partition
		await quickSort(arr, low, pi - 1);
		await quickSort(arr, pi + 1, high);
	}else if(low==high){
		document.getElementById(low).style.background="green";
	}
	
}
// Function call
// let arr=[7,5,4,1,3,2,6,8,9,10];
document.querySelector(".quickSort").addEventListener("click", ()=>{
	let response=quickSort(arr, 0, arr.length - 1);
})
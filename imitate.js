// // console.log('here')
// // fs.preloader({
// //     title: 'Loading',
// //     title_color: 'orange',
// //     title_size: '30px',
// //     title_ff: 'Times New Roman',
// //     title_style: 'italic',
// //     circle_speed: 500,
// //     time_to_hide: 500,
// //     circle_animation_type: 'linear',
// //     circle_secondary_color: 'orange',
// //     circle_main_color: 'gray',
// // })
// //
//
// let count = 1001
// console.log(count.toString(2))
//
// let number = count.toString(2)
// let newStr = ''
// for(let i = number.length - 1; i >= 0; i--){
//     newStr += number[i]
// }
// //Number(newStr).toString(10)
//
//
//
// let arr = []
// let MainRes;
// function f(n){
//     if(n !== 0){
//         arr.push(n % 2)
//         f(Math.floor(n / 2))
//     } else{
//         let res = ''
//         for(let i = arr.length - 1; i >= 0; i--){
//             res += String(arr[i])
//         }
//         MainRes = res
//     }
// }
//
// let resLoc = f(7)
// console.log(MainRes)
// // while(true){
// //     let number = count.toString(2)
// //     let newStr = ''
// //     for(let i = number.length - 1; i >= 0; i--){
// //         newStr += number[i]
// //     }
// //     let num10 = Number(newStr).toString(10)
// //     console.log(num10)
// //
// // }
//
//

let box_red = fs(".box_red");
let box_green = fs(".box_green");
let box_blue = fs(".box_blue");

box_blue.each((el)=>{
    el.html = "bl";
})

box_green.each((el) =>{
    el.html = "gr"
})

box_red.each((el)=>{
    el.html ="red";
})

let clockFn = (e) =>{
    e.target.style.backgroundColor = "balck";
}
box_red.click(clockFn)
//es6 => promise => lời hứa => true || false

function diCho() {
    setTimeout(() => {
        console.log("Bảo đi chợ");
    }, 2000);
}

function diMuaCafe() {
    console.log("Kha đi mua cafe");
}

diCho();

diMuaCafe();

let promiseDemo = new Promise((resolve, reject) => {
    let DTB = 8;
    if (DTB > 8) {
        resolve(console.log("Bạn thật xuất sắc"));
    } else {
        reject(console.log("Cố gắng hơn"));
    }
});

// nếu mà code logic đúng => thực thi resolve => then
// sai => thực thi reject => catch

promiseDemo
    .then(() => {
        console.log("Điểm của bạn phải trên 8 mới xuất sắc");
    })
    .catch(() => {
        console.log("Đã có lỗi");
    });

let promise2 = axios({
    method: "GET", //post, delete, put
    url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDun/LayDanhSachNguoiDung?MaNhom=GP01",
    headers: {
        TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxMiIsIkhldEhhblN0cmluZyI6IjIyLzAxLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTczNzUwNDAwMDAwMCIsIm5iZiI6MTcxMjk0MTIwMCwiZXhwIjoxNzM3NjUxNjAwfQ.QIS-5ejbLk-ly0KkZrtV0hoyQXSL9wqIkbziyg_m8hg",
    },
});

// let promise4 = axios({
//     method: "GET", //post, delete, put
//     url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
//     headers: {
//         TokenCybersoft:
//             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxMiIsIkhldEhhblN0cmluZyI6IjIyLzAxLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTczNzUwNDAwMDAwMCIsIm5iZiI6MTcxMjk0MTIwMCwiZXhwIjoxNzM3NjUxNjAwfQ.QIS-5ejbLk-ly0KkZrtV0hoyQXSL9wqIkbziyg_m8hg",
//     },
// });

//200 -> get thành công , 201 : -> created thành công;
//3 =>
//4 => 404: not found, 403: forbidden : ko có quyền , 401: authorize => không có trong hệ thống
//5 => 500: Server Error => code BE lỗi ;

// promise2
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

//json => nhẹ
//RESTFUL API // GRAPH QL

//instance

const http = axios.create({
    baseURL: "https://movienew.cybersoft.edu.vn/api/", //url => thay thế các endpoints
    timeout: 30000,
    headers: {
        TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxMiIsIkhldEhhblN0cmluZyI6IjIyLzAxLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTczNzUwNDAwMDAwMCIsIm5iZiI6MTcxMjk0MTIwMCwiZXhwIjoxNzM3NjUxNjAwfQ.QIS-5ejbLk-ly0KkZrtV0hoyQXSL9wqIkbziyg_m8hg",
    },
});

let dsNguoiDungPromise = http.get(
    "QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01"
);
dsNguoiDungPromise
    .then((resolve) => {
        console.log(resolve);
    })
    .catch((error) => {
        console.log(error);
    });

let dsPhimPromise = http.get("QuanLyPhim/LayDanhSachPhim?maNhom=GP01");

dsPhimPromise
    .then((res) => {
        console.log(res);
    })
    .catch((erorr) => {
        console.log(erorr);
    });

//async/ await => ES7
async function layDsUser() {
    try {
        await promise2.then((resolve) => {
            console.log(resolve);
        });
    } catch (error) {
        console.log("Lỗi nè", error);
    }
}

// async () => {
//     return await

layDsUser();

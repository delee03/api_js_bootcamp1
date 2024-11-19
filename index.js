const http = axios.create({
    baseURL: "https://movienew.cybersoft.edu.vn/api/", //url => thay thế các endpoints
    timeout: 30000,
    headers: {
        TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxMiIsIkhldEhhblN0cmluZyI6IjIyLzAxLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTczNzUwNDAwMDAwMCIsIm5iZiI6MTcxMjk0MTIwMCwiZXhwIjoxNzM3NjUxNjAwfQ.QIS-5ejbLk-ly0KkZrtV0hoyQXSL9wqIkbziyg_m8hg",
        authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYmFvMTIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJCYW5oaGhAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIlF1YW5UcmkiLCJCYW5oaGhAZ21haWwuY29tIiwiR1AwMCJdLCJuYmYiOjE3MzA0NjI3MjksImV4cCI6MTczMDQ2NjMyOX0.i7ObsPvb0A2OJ-UAQn7gLes-Y8xPYCIorfObPOOdGK4",
    },
});

// let dsNguoiDungPromise = http.get(
//     "QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01"
// );
// dsNguoiDungPromise
//     .then((resolve) => {
//         console.log(resolve.data.content);
//         renderArrNguoiDung(resolve.data.content);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

async function LayDanhSachNguoiDung() {
    let response = await http.get(
        "QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP00"
    );
    //console.log(response);
    renderArrNguoiDung(response.data.content);
}

LayDanhSachNguoiDung();

function getValueForm() {
    //get tất cả các field

    let arrField = document.querySelectorAll("#formQLND input");
    //duyệt qua arr và lấy dữ liệu từ input
    //console.log(arrField);
    let nguoiDung = {};
    for (let field of arrField) {
        let { id, value } = field;
        nguoiDung[id] = value;
    }
    console.log(nguoiDung);
    return nguoiDung;
}

document.getElementById("formQLND").onsubmit = themNguoiDung;

function themNguoiDung(event) {
    event.preventDefault();
    let newNguoiDung = getValueForm();
    http.post("QuanLyNguoiDung/DangKy", newNguoiDung)
        .then((resolve) => {
            console.log(resolve);
        })
        .catch((error) => {
            console.log(error);
        });
}

function renderArrNguoiDung(array) {
    let content = "";
    for (let user of array) {
        let { taiKhoan, email, hoTen, soDT, maLoaiNguoiDung } = user;
        content += `
            <tr class="">
                            <td scope="row">${taiKhoan}</td>
                            <td>${email}</td>
                            <td>${hoTen}</td>
                             <td>${soDT}</td>
                            <td>${
                                maLoaiNguoiDung == "QuanTri"
                                    ? '<p class="badge text-bg-danger">Quản trị</p>'
                                    : '<p class="badge text-bg-success">Khách hàng</p>'
                            }</td>
                            <td>
                                 <button
                            type="button"
                            onClick=getInfoUser('${taiKhoan}')
                            class="btn btn-warning"
                        >
                            Sửa
                        </button>
                      
                            </td>
                            <td>
                              <button type="button" onClick=deleteUser('${taiKhoan}') class="btn btn-danger">
                           Xóa
                        </button> </td>
                        </tr>
                       
        `;
    }
    document.getElementById("tableBody").innerHTML = content;
}

function deleteUser(taiKhoan) {
    http.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
        .then((res) => {
            console.log(res);
            alert("Xóa thành công user" + taiKhoan);
        })
        .catch((err) => {
            console.log(err);
            alert("Đã có lỗi xảy ra vui lòng thử lại sau!");
        });
}
let nguoiDung = {};
let maLoaiNguoiDung = null;

function getInfoUser(taiKhoan) {
    http.post(`QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`)
        .then((res) => {
            //  console.log(res.data.content);
            nguoiDung = res.data.content;
            maLoaiNguoiDung = res.data.content.maLoaiNguoiDung;
            console.log(nguoiDung);
            let arrField = document.querySelectorAll("#formQLND input");
            // console.log(arrField);
            for (let field of arrField) {
                // console.log(field);
                let { id } = field;
                field.value = nguoiDung[id];
                // console.log(id, value);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

function updateInfoUser() {
    let nguoiDung = getValueForm();
    let newNguoiDung = { ...nguoiDung, maNhom: "GP00", maLoaiNguoiDung };
    http.post("QuanLyNguoiDung/CapNhatThongTinNguoiDung", newNguoiDung)
        .then((res) => {
            console.log(res);
            LayDanhSachNguoiDung();
        })
        .catch(() => {});
}

document.getElementById("btnCapNhat").onclick = updateInfoUser;

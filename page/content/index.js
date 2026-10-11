import "./index.css"
import "../../utils/alert.js"
import { axios } from "@/request.js"
import { auth } from "../../utils/auth.js"
/**
 * 目标1：获取文章列表并展示
 *  1.1 准备查询参数对象
 *  1.2 获取文章列表数据
 *  1.3 展示到指定的标签结构中
 */

/**
 * 目标2：筛选文章列表
 *  2.1 设置频道列表数据
 *  2.2 监听筛选条件改变，保存查询信息到查询参数对象
 *  2.3 点击筛选时，传递查询参数对象到服务器
 *  2.4 获取匹配数据，覆盖到页面展示
 */

/**
 * 目标3：分页功能
 *  3.1 保存并设置文章总条数
 *  3.2 点击下一页，做临界值判断，并切换页码参数并请求最新数据
 *  3.3 点击上一页，做临界值判断，并切换页码参数并请求最新数据
 */

/**
 * 目标4：删除功能
 *  4.1 关联文章 id 到删除图标
 *  4.2 点击删除时，获取文章 id
 *  4.3 调用删除接口，传递文章 id 到服务器
 *  4.4 重新获取文章列表，并覆盖展示
 *  4.5 删除最后一页的最后一条，需要自动向前翻页
 */

// 点击编辑时，获取文章 id，跳转到发布文章页面传递文章 id 过去

const { createEditor, createToolbar } = window.wangEditor

const editorConfig = {
  placeholder: 'Type here...',
  onChange(editor) {
    const html = editor.getHtml()
    document.querySelector("textarea").value = html;
    console.log(document.querySelector("textarea").value)
  }
}


const editor = createEditor({
  selector: '#editor-container',
  html: '<p><br></p>',
  config: editorConfig,
  mode: 'default', // or 'simple'
})
const toolbarConfig = {}

const toolbar = createToolbar({
  editor,
  selector: '#toolbar-container',
  config: toolbarConfig,
  mode: 'default', // or 'simple'
})


const editModal = new bootstrap.Modal("#edit-modal");
const deleteModal = new bootstrap.Modal("#delete-modal");

console.log(editor)
let selectedArticle;
auth();

getArticleList();
console.log("test")
getChannelList();

document.querySelector(".pagination").addEventListener("click", function (e) {
  e.preventDefault();
  console.log("!")
  const currentPage = document.querySelector(".page-now").dataset.id;
  const totalCount = document.querySelector(".total-count").dataset.id;
  const params = {};
  if (e.target.classList.contains("next")) {
    params.page = +currentPage + 1
    if (+currentPage * 10 >= +totalCount) {
      myAlert(false, "当前为最后一页")
      return
    }
  } else if (e.target.classList.contains("last")) {
    if (+currentPage === 1) {
      myAlert(false, "当前为第一页");
      return;
    }
    params.page = +currentPage - 1
  }
  getArticleList(params).then(r => {
    console.log(r)
  })
})

document.querySelector("body").addEventListener("hide.bs.modal", function (e) {
  if (document.activeElement) {
    document.activeElement.blur();
  }
  console.log(1)
  this.querySelector(".modal form").reset();
  editor.clear()
})

document.querySelector(".table.table-striped").addEventListener("click", function (e) {
  if (e.target.tagName === "I") {
    selectedArticle = e.target.id;
    if (e.target.classList.contains("edit")) {
      // getChannelList();
      // getArticleDetail(e.target.id);
      //等待所有promise完成进行数据回显
      Promise.all([getChannelList(), getArticleDetail(e.target.id)]).then(r => {
        document.querySelector(".modal .form-select").innerHTML = '<option value="" selected>请选择文章频道</option>' + r[0].data.data.channels.map(item => {
          return ` <option value="${item.id}">${item.name}</option>`
        }).join("")
        document.querySelector(`.modal .form-select option[selected]`).selected = false
        console.log(r[1])
        for (let k in r[1].data.data) {
          console.log(k)
          if (document.querySelector(`form [name="${k}"]`)) {
            if (k === "channel_id") {

              document.querySelector(`.modal .form-select option[value="${r[1].data.data[k]}"]`).selected = true
            } else {
              document.querySelector(`form [name="${k}"]`).value = r[1].data.data[k]
            }
          }
        }
        editor.setHtml(r[1].data.data.content)
        document.querySelector(".cover").classList.add("show");
        document.querySelector(".cover img").src = r[1].data.data.cover.images[0] || ""
      })
    } else if (e.target.classList.contains("del")) {
      deleteModal.show();
    }
  }
})
document.querySelector("#delete-modal .btn-primary").addEventListener("click", async function () {
  if (selectedArticle) {
    await deleteArticle(selectedArticle);
  }
  deleteModal.hide()
})
document.querySelector("#edit-modal .modal-footer .btn-primary").addEventListener("click", function () {
  document.querySelector(".modal form").requestSubmit();
})


document.querySelector(".cover input").addEventListener("change", function () {
  console.log(this.files)
  document.querySelector(".cover img").src = URL.createObjectURL(this.files[0])
})

document.querySelector(".modal form").addEventListener("submit", async function (e) {
  e.preventDefault();
  //发送照片数据拿到照片连接
  let url = document.querySelector(".cover img").src;
  if (document.querySelector("input.img-file").files.length > 0) {
    const formData = new FormData();
    formData.append("image", document.querySelector("input.img-file").files[0])
    const result = await axios({
      url: "/v1_0/upload",
      method: "POST",
      data: formData
    })
    url = result.data.data.url
  }

  const data = {};
  $(this).serializeArray().forEach(item => {
    data[item.name] = item.value
  })

  data.cover = {
    type: 1,
    images: [url]
  }

  console.log(data);

  const r = await editArticle(data.id, data);

  editModal.hide();
  console.log(r)
  getArticleList();
})




document.querySelector(".sel-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const data = {}
  console.log($(this).serializeArray())
  $(this).serializeArray().forEach(item => {
    if (item) {
      data[item.name] = item.value;
    }
  })

  const result = await getArticleList(data)

})


async function getArticleDetail(id) {
  const result = await axios({
    url: `/v1_0/mp/articles/${id}`,
  })
  console.log(result)
  return result;
}
async function editArticle(id, data) {
  const result = await axios({
    url: `/v1_0/mp/articles/${id}`,
    method: "PUT",
    data
  })
  console.log(result);
}

async function deleteArticle(id) {
  const result = await axios({
    url: `/v1_0/mp/articles/${id}`,
    method: "DELETE"
  })
  getArticleList()
  console.log(result)
}
async function getChannelList() {
  const result = await axios({
    url: "/v1_0/channels"
  });
  document.querySelector(".form-select").innerHTML = '<option value="" selected>请选择文章频道</option>' + result.data.data.channels.map(item => {
    return ` <option value="${item.id}">${item.name}</option>`
  }).join("")
  return result;
}

async function getArticleList(params) {
  const data = await axios({
    url: "/v1_0/mp/articles",
    params: {
      ...params
    }
  })
  document.querySelector(".card .align-middle.art-list").innerHTML = data.data.data.results.map(item => {
    return ` <tr>
                      <td>
                        <img
                          src="${item.cover.images[0] || ""}"
                          alt="">
                      </td>
                      <td>${item.title}</td>
                      <td>
                        ${item.status === 2 ? '<span class="badge text-bg-success">审核通过</span>' : '<span class="badge text-bg-primary">待审核</span>'}
                      </td>
                      <td>
                        <span>${item.pubdate}</span>
                      </td>
                      <td>
                        <span>${item.read_count}</span>
                      </td>
                      <td>
                        <span>${item.comment_count}</span>
                      </td>
                      <td>
                        <span>${item.like_count}</span>
                      </td>
                      <td>
                        <i class="bi bi-pencil-square edit" id="${item.id}" data-bs-toggle="modal" data-bs-target="#edit-modal"></i>
                        <i class="bi bi-trash3 del" id="${item.id}" data-bs-toggle="modal" data-bs-target="#delete-modal"></i>
                      </td>
                    </tr>`
  }).join("")
  console.log(data)
  document.querySelector(".page-item.page-now").innerHTML = `第${data.data.data.page}页`
  document.querySelector(".page-item.page-now").dataset.id = data.data.data.page
  document.querySelector(".total-count").innerHTML = `共${data.data.data.total_count}条`
  document.querySelector(".total-count").dataset.id = data.data.data.total_count
  return data;
}
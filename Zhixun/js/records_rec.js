$(document).ready(function () {
  let data = callAPI();

  // 建立table
  const tableBody = $("#records-table tbody");
  tableBody.empty();
  data.forEach(function (record) {
    const row = `<tr data-link="${record.link}">
                          <td>${record.title}</td>
                          <td>${record.uploader}</td>
                          <td>${record.uploadDate}</td>
                       </tr>`;
    tableBody.append(row);
  });

  const table = $("#records-table").DataTable({
    paging: true,
    searching: true,
    ordering: true,
    pageLength: 5,
    language: {
      sProcessing: "處理中...",
      sLengthMenu: "顯示 _MENU_ 項結果",
      sZeroRecords: "沒有匹配結果",
      sInfo: "顯示第 _START_ 至 _END_ 項結果，共 _TOTAL_ 項",
      sInfoEmpty: "顯示第 0 至 0 項結果，共 0 項",
      sInfoFiltered: "(從 _MAX_ 項結果過濾)",
      sInfoPostFix: "",
      sSearch: "搜索:",
      sUrl: "",
      paginate: {
        previous: "&lt;",
        next: "&gt;",
      },
    },
  });

  $("#records-table tbody").on("click", "tr", function () {
    const link = $(this).data("link");
    if (link) {
      window.location.href = link;
    }
  });

  $("#searchButton").on("click", function () {
    const startDate = new Date($("#startDate").val());
    const endDate = new Date($("#endDate").val());

    $.fn.dataTable.ext.search.push(function (settings, data) {
      const date = new Date(data[2]);
      return date >= startDate && date <= endDate;
    });

    table.draw();
    $.fn.dataTable.ext.search.pop();
  });

  // 時間日期設定
  const startDatePicker = flatpickr("#startDate", {
    enableTime: false,
    dateFormat: "Y-m-d",
    locale: "zh",
    maxDate: "today",
    time_24hr: false,
    disableMobile: true,
    allowInput: false,
  });

  const endDatePicker = flatpickr("#endDate", {
    enableTime: false,
    dateFormat: "Y-m-d",
    time_24hr: false,
    locale: "zh",
    maxDate: "today",
    disableMobile: true,
    allowInput: false,
  });

  $(".input-wrapper i.fa-regular.fa-calendar").on("click", function () {
    const inputId = $(this).siblings("input").attr("id");
    if (inputId === "startDate") {
      startDatePicker.open();
    } else if (inputId === "endDate") {
      endDatePicker.open();
    }
  });
});

function callAPI() {
  const data = [
    {
      title: "我是標題1",
      uploader: "王小明",
      uploadDate: "2024-09-21",
      link: "preview_receipt.html",
    },
    {
      title: "我是標題2",
      uploader: "王中明",
      uploadDate: "2024-09-22",
      link: "preview_receipt.html",
    },
    {
      title: "我是標題3",
      uploader: "王大明",
      uploadDate: "2024-09-23",
      link: "preview_receipt.html",
    },
    {
      title: "我是標題4",
      uploader: "小安娜",
      uploadDate: "2024-09-26",
      link: "preview_receipt.html",
    },
    {
      title: "我是標題5",
      uploader: "大安娜",
      uploadDate: "2024-09-27",
      link: "preview_receipt.html",
    },
    {
      title: "我是標題6",
      uploader: "大安娜",
      uploadDate: "2024-09-27",
      link: "preview_receipt.html",
    },
    {
      title: "我是標題7",
      uploader: "大安娜",
      uploadDate: "2024-09-27",
      link: "preview_receipt.html",
    },
    {
      title: "我是標題8",
      uploader: "大安娜",
      uploadDate: "2024-09-27",
      link: "preview_receipt.html",
    },
    {
      title: "我是標題9",
      uploader: "大安娜",
      uploadDate: "2024-09-27",
      link: "preview_receipt.html",
    },
  ];

  return data;
}

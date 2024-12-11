$(document).ready(function () {
  var orgdata = JSON.parse(localStorage.getItem("orgdata")) || [];
  const iconText = "機電"; // 設置預設值
  const recordtext = "查詢發票";
  if (typeof BreadcrumbManager !== "undefined") {
    console.log("1");
    BreadcrumbManager.updateBreadcrumb(iconText, recordtext);
  }
  $(".fa-chevron-left").on("click", function () {
    window.location.href = "view.html";
  });
  callAPI()
    .then((data) => {
      // console.log(data);
      // console.log(orgdata);
      if (!Array.isArray(data)) {
        console.error("API 返回的數據不是數組:", data);
        return;
      }

      // 建立table
      const tableBody = $("#records-table tbody");
      tableBody.empty();
      const processedIds = new Set(); // 追蹤已處理的 ID
      const reversedOrgData = [...orgdata].reverse();

      // 先處理 orgdata 的資料
      reversedOrgData.forEach((item) => {
        processedIds.add(item.rec_id);

        var date = new Date(item.date);
        date.setDate(date.getDate() + 1);
        var formattedDate = date.toISOString().substring(0, 10);

        const row = `<tr data-link="${item.rec_id}">
      <td>${item.rec_title}</td>
      <td>${item.user}</td>
      <td>${formattedDate}</td>
    </tr>`;
        tableBody.append(row);
      });

      // 再處理 API 資料，但只處理未出現過的 ID
      data.forEach((record) => {
        if (!processedIds.has(record.rec_id)) {
          var date = new Date(record.date);
          date.setDate(date.getDate() + 1);
          var formattedDate = date.toISOString().substring(0, 10);

          const row = `<tr data-link="${record.rec_id}">
      <td>${record.rec_title}</td>
      <td>${record.user}</td>
      <td>${formattedDate}</td>
    </tr>`;

          tableBody.append(row);
        }
      });

      const table = $("#records-table").DataTable({
        paging: true,
        searching: true,
        ordering: true,
        pageLength: 5,
        order: [[2, "desc"]],
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
        const rec_id = $(this).data("link");
        if (rec_id) {
          localStorage.setItem("recid", rec_id);
          window.location.href = "preview_receipt.html";
        }
      });
      $("#searchButton").on("click", function () {
        const startDate = new Date($("#startDate").val());
        const endDate = new Date($("#endDate").val());
        console.log(startDate, endDate);
        $.fn.dataTable.ext.search.push(function (settingas, data) {
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
    })
    .catch((error) => {
      console.error("API 調用失敗:", error);
    });
});

async function callAPI() {
  try {
    const data = await $.ajax({
      url: `${window.API_CONFIG.baseUrl}/recordreceipt`,
      type: "GET",
    });
    return data.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

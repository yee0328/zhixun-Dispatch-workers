$(document).ready(function () {
  const iconText = localStorage.getItem("uploadType");
  const recordtext = "維護及施工紀錄查詢";
  if (typeof BreadcrumbManager !== "undefined") {
    console.log("1");
    BreadcrumbManager.updateBreadcrumb(iconText, recordtext);
  }
  $(".recordtext").on("click", function () {
    window.location.href = "records_maintenance.html";
  });
  $(".fa-chevron-left").on("click", function () {
    window.location.href = "view.html";
  });
  callAPI(iconText)
    .then((data) => {
      // console.log(data);
      if (!Array.isArray(data)) {
        console.error("API 返回的數據不是數組:", data);
        return;
      }

      // 建立table
      const tableBody = $("#records-table tbody");
      tableBody.empty();
      data.forEach(function (record) {
        var date = new Date(record.date);
        date.setDate(date.getDate() + 1);
        var formattedDate = date.toISOString().substring(0, 10);
        const row = `<tr data-link="${record.main_id}">
                            <td>${record.main_class}</td>
                            <td>${record.user}</td>
                            <td>${formattedDate}</td>
                         </tr>`;
        tableBody.append(row);
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
        const main_id = $(this).data("link");
        if (main_id) {
          localStorage.setItem("mainid", main_id);
          window.location.href = "preview_maintenance.html";
        }
      });
      $("#searchButton").on("click", function () {
        const startDate = new Date($("#startDate").val());
        const endDate = new Date($("#endDate").val());
        const category = $("#category").val();
        // console.log(startDate, endDate);
        // console.log("Settings", settings, data);
        $.fn.dataTable.ext.search.push(function (settings, data) {
          const date = new Date(data[2]);
          const title = data[0];
          const dateInRange = date >= startDate && date <= endDate;
          const categoryMatch = !category || title.includes(category);
          if (
            startDate.toString() === "Invalid Date" &&
            endDate.toString() === "Invalid Date"
          ) {
            // 只有 category 時
            return categoryMatch;
          } else if (
            startDate.toString() === "Invalid Date" ||
            endDate.toString() === "Invalid Date"
          ) {
            // 只有一個日期無效時
            return categoryMatch;
          } else {
            // 日期範圍和 category 都存在時
            return dateInRange && categoryMatch;
          }
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

async function callAPI(type) {
  try {
    const data = await $.ajax({
      url: `${window.API_CONFIG.baseUrl}/recordmaintenance`,
      type: "GET",
      data: {
        type: type,
      },
    });
    console.log("Response data:", data);
    return data.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

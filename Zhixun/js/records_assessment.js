$(document).ready(function () {
  var orgdata = JSON.parse(localStorage.getItem("orgdata")) || [];
  const iconText = localStorage.getItem("uploadType");
  const recordtext = "查詢估價單紀錄";
  if (typeof BreadcrumbManager !== "undefined") {
    console.log("1");
    BreadcrumbManager.updateBreadcrumb(iconText, recordtext);
  }
  $(".recordtext").on("click", function () {
    window.location.href = "records_assessment.html";
  });
  $(".fa-chevron-left").on("click", function () {
    window.location.href = "view.html";
  });
  var changeText = document.getElementById("changeText");
  changeText.innerHTML = changeText.innerHTML.replace("機電", iconText);
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
      // 先處理 orgdata (從最新到最舊)
      const processedIds = new Set(); // 追蹤已處理的 ID
      const reversedOrgData = [...orgdata].reverse();

      // 先處理 orgdata 的資料
      reversedOrgData.forEach((item) => {
        processedIds.add(item.ass_id);

        var date = new Date(item.date);
        date.setDate(date.getDate() + 1);
        var formattedDate = date.toISOString().substring(0, 10);

        const row = `<tr data-link="${item.ass_id}">
      <td>${item.ass_title}</td>
      <td>${item.user}</td>
      <td>${formattedDate}</td>
    </tr>`;

        tableBody.append(row);
      });

      // 再處理 API 資料，但只處理未出現過的 ID
      data.forEach((record) => {
        if (!processedIds.has(record.ass_id)) {
          var date = new Date(record.date);
          date.setDate(date.getDate() + 1);
          var formattedDate = date.toISOString().substring(0, 10);

          const row = `<tr data-link="${record.ass_id}">
      <td>${record.ass_title}</td>
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
        const ass_id = $(this).data("link");
        if (ass_id) {
          localStorage.setItem("ass_id", ass_id);
          window.location.href = "preview_assessment.html";
        }
      });
      $("#searchButton").on("click", function () {
        const startDate = new Date($("#startDate").val());
        const endDate = new Date($("#endDate").val());
        console.log(startDate, endDate);
        // console.log("Settings", settings, data);
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
    })
    .catch((error) => {
      console.error("API 調用失敗:", error);
    });
});

async function callAPI(type) {
  try {
    const data = await $.ajax({
      url: `${window.API_CONFIG.baseUrl}/recordassessment`,
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
  // 假資料;
  // const data = await [
  //   {
  //     ass_id: "2024112001",
  //     ass_title: "我是標題9",
  //     user: "admin",
  //     date: "2024-11-20",
  //   },
  //   {
  //     ass_id: "2024112002",
  //     ass_title: "我是標題7",
  //     user: "admin",
  //     date: "2024-11-20",
  //   },
  //   {
  //     ass_id: "2024112003",
  //     ass_title: "我是標題6",
  //     user: "admin",
  //     date: "2024-11-20",
  //   },
  //   {
  //     ass_id: "2024112004",
  //     ass_title: "我是標題8",
  //     user: "admin",
  //     date: "2024-11-20",
  //   },
  // ];
  // return data;
}

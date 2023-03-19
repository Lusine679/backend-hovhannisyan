// user search
function myFunction() {
    var userName, filter, table, tr, td, i, txtValue, nextBtn, prevBtn;
    userName = document.getElementById("user-name");
    filter = userName.value.toUpperCase();
    table = document.getElementById("userTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
}

// role filter ajax
jQuery('.custom-select select').on('click', function() {
    let val = jQuery(this).val();

    jQuery.ajax({
        url: my_ajax_object.ajax_url,
        data: {
            action: 'user_filter',
            role : val,
        },
        dataType: 'JSON',
        type: 'POST',
        success: function(res) {
          
            let j = 1;
            let userTable = jQuery("#userTable");
            userTable.html("");
            userTable.append('<tr class="header"><th>N</th><th>Name</th><th>Mail</th><th>Role</th></tr>');
            if(res == ''){
                userTable.append("<tr><td>No result<td><td></td><td></td></td>");
            }
            for(let i = 0; i < res.length; i++){
                    let table = "<tr><td> " + j++ +"</td>" + 
                            "<td> " + res[i]['data']['display_name'] + "</td>" + 
                            "<td> " + res[i]['data']['user_email'] + "</td>" + 
                            "<td> " + (res[i]['roles'][0] ? res[i]['roles'][0] : "") + "</td>" + 
                            + "</tr>";
                    userTable.append(table);
            }

            let pager = new Pager('userTable', 10);
            pager.init();
            pager.showPageNav('pager', 'pageNavPosition');
            pager.showPage(1);

        }
    });
});

// table pagination 
function Pager(tableName, itemsPerPage) {
    this.tableName = tableName;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.pages = 0;
    this.inited = false;

    this.showRecords = function (from, to) {
        let rows = document.getElementById(tableName).rows;

        for (let i = 1; i < rows.length; i++) {
            if (i < from || i > to) {
                rows[i].style.display = 'none';
            } else {
                rows[i].style.display = '';
            }
        }
    };

    this.showPage = function (pageNumber) {
        if (!this.inited) {
            return;
        }

        let boxes = document.querySelectorAll('#pageNavPosition span');
        boxes.forEach(box => {
            box.classList.remove('pg-selected');
        });
        document.getElementById('pg' + pageNumber).classList.add('pg-selected');

        let from = (pageNumber - 1) * itemsPerPage + 1;
        let to = from + itemsPerPage - 1;
        this.showRecords(from, to);

        let tableItemLength = document.getElementById("userTable").rows.length;
 
        if(tableItemLength <= 10){
            document.getElementById('pageNavPosition').style.opacity = 0;
        }else{
            document.getElementById('pageNavPosition').style.opacity = 1;
        }
    };

    this.prev = function () {
        if (this.currentPage > 1) {
            this.showPage(this.currentPage - 1);
        }
    };

    this.next = function () {
        if (this.currentPage < this.pages) {
            this.showPage(this.currentPage + 1);
        }
    };

    this.init = function () {
        let rows = document.getElementById(tableName).rows;
        let records = (rows.length - 1);

        this.pages = Math.ceil(records / itemsPerPage);
        this.inited = true;
    };

    this.showPageNav = function (pagerName, positionId) {
        if (!this.inited) {
            return;
        }

        let element = document.getElementById(positionId);
        let pagerHtml = "";
        for (let page = 1; page <= this.pages; page++) {
            pagerHtml += '<span id="pg' + page + '" class="pg-normal pg-next" onclick="' + pagerName + '.showPage(' + page + ');">' + page + '</span>';
        }
        element.innerHTML = pagerHtml;
    };
}

let pager = new Pager('userTable', 10);
pager.init();
pager.showPageNav('pager', 'pageNavPosition');
pager.showPage(1);
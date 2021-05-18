$(function(){
    reqajex();
    $("#recipes").on("click",".btn-danger",handledel);
    $("#btn").click(addproduct);
    $("#recipes").on("click",".btn-warning",handleedit);
    
    $("#save").click(function(){
        let name=$("#Name").val();
        let price=$("#Price").val();
        let color=$("#Color1").val();
        let department=$("#Department").val();
        let description=$("#Description").val();
        $.ajax({
            url:"https://usman-recipes.herokuapp.com/api/products",
            method:"POST",
            data:{name,price,color,department,description},
            success:function (result){
                console.log(result);
            reqajex();
            $("#addmodel").modal("hide");
            },
        });
    });


    $("#UpdatedSave").click(function() {
        let id = $("#updateId").val();
        let name =  $("#UpdateName").val();
        let price = $("#UpdatePrice").val();
        let color= $("#Updatecolor").val();
        let department=$("#UpdateDepartment1").val();
        let description=$("#UpdateDescription").val();
            $.ajax({
            url: "https://usman-recipes.herokuapp.com/api/products/" + id,
            data: { name, price,color,department,description },
            method: "PUT",
                success: function() {  
                reqajex();
                $("#updatemodle").modal("hide");
            }
        });
    });
});
    
    
    function handleedit(){
        let btn=$(this);
        let parent=btn.closest(".product");
        let id=parent.attr("data-id");
        $.get("https://usman-recipes.herokuapp.com/api/products/"+id,function(result){
    
            $("#updateId").val(result._id);
            $("#UpdateName").val(result.name);
            $("#UpdatePrice").val(result.price);
            $("#Updatecolor").val(result.color);
            $("#UpdateDepartment1").val(result.department);
            $("#UpdateDescription").val(result.description);
            $("#updatemodle").modal("show");
        });
    }
    
    function addproduct(){
    $("#addmodel").modal("show");
    
    }
    
    function handledel()
    {
        let btn=$(this);
        let parent=btn.closest(".product");
        let id=parent.attr("data-id");
        console.log(id);
    
        $.ajax({
            url:"https://usman-recipes.herokuapp.com/api/products/"+id,
            method:"DELETE",
            success:function(){
                reqajex();
            },
        });    
    }
    
    function reqajex()
    {
    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/products",
        method:"GET",
        success:function(result){
          let req= $("#recipes");
          console.log(result);
    
         req.empty();
          for(let i=0;i<result.length;i++){
            let rec=result[i];
              req.append(`
              <div class="product" data-id="${rec._id}">
               <h4>Name:<p><button class="btn btn-danger btn-sm float-right">Delete</button> <button class="btn btn-warning btn-sm float-right">Edit</button>${rec.name}</p>
               <h4>Price:</h4><p>${rec.price}<p>
                <h4>Color:</h4></u><p>${rec.color}<p>
               <h4>Department:</h4><p>${rec.department}</p>
               <h4>Description:</h4>
               <p>${rec.description}</p>
              </div>`);    
            }
        },
    });
}
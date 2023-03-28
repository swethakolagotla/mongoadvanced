import Database from "../models/productModel.js";
import AdvancedFiltering from "../utils/advancedFiltering.js";
import AdvancedFilteringFunction from "../utils/advancedFilteringFunction.js";
import { cleanUp, whiteFields } from "../utils/common.js";
import catchErrorAsync from "../utils/catchErrorAsync.js";
import ApiErrorModel from "../utils/apiErrorModel.js";
const insertProduct = async (req, res) => {
  const iphone = await Database.create(req.body);
  res.status(201).json({
    status: "success",
    data: iphone,
  });
};
const getProduct = catchErrorAsync(async (req, res) => {
  try {
    let query = cleanUp(req.query);
    let findQuery = whiteFields(query);
    console.log(req.query);

    //const data = await Database.find(query)//
    //sorting logic
    let queryString = Database.find(findQuery);
    if (query.sort) {
      queryString = queryString.sort(query.sort);
    }
    let querystringFinal = new AdvancedFilteringFunction(
      req.query,
      Database.find()
    )
      .find()
      .sort()
      .pagination()
      .fields();
    //page,limit
    //querystring=querystring.skip(2)
    //queryString=queryString.limit(3)
    //pagination
    /*if(query.limit&&query.page)
    {
    queryString=queryString.skip(query.limit*(query.page-1)).limit(query.limit)
    }
    //fields
    if(query.fields)
    {
    queryString=queryString.select(query.fields)
    }*/
    const resultdata = await querystringFinal.queryString;
    //console.log(data);
    res.json({
      status: "success",
      result: resultdata.length,
      resultdata,
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: e.message,
    });
  }
});
const updateProduct = catchErrorAsync(async (req, res) => {
  const update = await Database.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }); //if i remove  new:true, the data wont be updated in post man....but it updated in mongodb
  res.status(201).json({
    status: "succesfully updated",
    data: update,
  });
});
const updateProductDetails = catchErrorAsync(async (req, res) => {
  // const updatedItems = await Product.findOneAndUpdate(req.query, req.body, {
  //   new: true,
  // });
  try {
    const updatedItems = await Database.updateMany(req.query, req.body);

    res.status(201).json({
      status: "success",
      message: "successfully updated",
      data: updatedItems,
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: e.message,
    });
  }
});

const deleteProduct = catchErrorAsync(async (req, res) => {
  //here this catcherrorasync called an dit goes to the catcherrorasync function , from there it calls the globalerrorhandling function and we get the output "something broke"
  const deletedItems = await Database.deleteMany(req.query);

  res.status(201).json({
    status: "success",
    message: "successfully deleted",
    data: deletedItems,
  });
});
const getProductbyId = catchErrorAsync(async (req, res) => {
      const data = await Database.findById(req.params.id);
if(!data){
  return next(new ApiErrorModel('no product available',404))
}
       res.json({
         status: "success",
         data,
       });
  /*try {
    const data = await Database.findById(req.params.id);
    res.json({
      status: "success",
      data,
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: e.message,
    });
  }*/
});
const aggregateProducts=catchErrorAsync(async(req,res,next)=>{
  const data=await Database.aggregate([
    {
      $match:{
        price:{'$lte':100}
      }
    },
    {
      $group:{
        _id:'$category',
        count:{$sum:1},
        avgprice:{$avg:'$price'},
        maxprice:{$max:'$price'},
        minprice:{$min:'$price'}
      }
    },
    {
      $addFields:{
        category:'$_id'
      }
    },
    {
      $project:{
        _id:0
      }
    },
    {
$sort:{
  avgprice:-1
}
    },
    {
      $match:{
        category:{$nin:["men's clothing"]}
      }
    }
    
  ])
   res.json({
     status: "success",
     data,
   });
})
export {
  updateProductDetails,
  insertProduct,
  getProduct,
  getProductbyId,
  updateProduct,
  deleteProduct,
  aggregateProducts
};

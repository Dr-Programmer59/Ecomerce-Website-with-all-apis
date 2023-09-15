class ApiFeatures{
    constructor(query,querystr){
        this.query=query;
        this.querystr=querystr;

    }   
    search(){
        const keyword=this.querystr.keyword?{
            name:{
                $regex:this.querystr.keyword,
                $options:'i',
            }

        }:{}
        this.query=this.query.find({...keyword});
        return this;
    }
    filter(){
        const queryCopy={...this.querystr}
        const removeFields=["keyword","limit","page"]
    
        removeFields.map(key=>delete queryCopy[key]);
        // console.log(queryCopy)
        // working for price

        let queryStr=JSON.stringify(queryCopy);
        // console.log(/\b(gt|gte|lt|lte)\b/g);

        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);
        // console.log(queryStr);

        this.query=this.query.find(JSON.parse(queryStr))
        return this
    }
    pagination(productPerPage){
        const currentPage=Number(this.querystr.page)||1;
        const skip=productPerPage*(currentPage-1);
        this.query=this.query.limit(productPerPage).skip(skip);
        return this;
    }
}

module.exports=ApiFeatures;
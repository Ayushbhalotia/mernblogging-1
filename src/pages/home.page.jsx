import { useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/inpage-navigation.component";
import axios from "axios";
import Loader from "../components/loader.component"
import BlogPostCard from "../components/blog-post.component";
import MinimalBlogPost from "../components/nobanner-blog-post.component";

const Homepage = () => {

  let [blogs, setBlog] = useState(null);
  let [trendingBlogs, setTrendingBlog] = useState(null);

  let categories = ["programming", "hollywood", "film making", "ai", "social media", "cooking", "tech", "finances", "travel"]
let [pageState,setPageState] = useState("home");


  const fetchLatestBlogs = () => {
    axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs")
      .then(({ data }) => {
        setBlog(data.blogs);
      })
      .catch(err => {
        console.log(err)
      })

  }

  useEffect(() => {

    if(pageState == "home"){
      fetchLatestBlogs();
    }

    if(!trendingBlogs){
      fetchTrendingBlogs();
    }
  

  }, [pageState])
 
  const fetchTrendingBlogs = () => {
    axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
      .then(({ data }) => {
        setTrendingBlog(data.blogs);
      })
      .catch(err => {
        console.log(err)
      })

  }

  const loadBlogByCategory =(e) =>{
  let category = e.target.innerText.toLowerCase();
  // nikal liye konsa button click hua 
  setBlog(null);
// ab setBlog se blog ko null kar denge and ab isliye kiye kyuki yaha se karenge call server me alag route ko jisse lenge db se wo blog jo iss category ko belong karta ho and usse blog me set kar denge setblog se kar denge blog ko yaha 
if(pageState == category){
  // pagestate yaha home hai default and jab koi filter ko click kiye toh page state yaha aake chnge ho jayega and jo category hoga wo and isko use karke backend se lenge magar yadi ek baar click kr diye and phir ussi fiter me click kiye matlab ki htana chah rhe hai toh wapas pagestate home and ab bich me null kar rhe hai kyuki ab naya daalenge blogs me and abhi kuch utna functionality daale nhi hai toh null hote hi home wala jo blog hoga usme loader dikhega as null ho gya hai blogs yaha 

setPageState("home");
return;
}
setPageState(category);

  }


  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10">
        <div className="w-full">
      
          <InPageNavigation routes={[pageState, "trending blogs"]} defaultHidden={"trending blogs"}>

            <>
              {
                blogs == null ? <Loader />
                  :
                  blogs.map((blog, i) => {
                    return <AnimationWrapper transition={{ duration: 1, delay: i * .1 }} key={i}>
                      <BlogPostCard content={blog} author={blog.author.personal_info} />
                    </AnimationWrapper>
                  })
              }
            
            </>

          

            {
              trendingBlogs == null ? <Loader />
                :
                trendingBlogs.map((blog, i) => {
                  return <AnimationWrapper transition={{ duration: 1, delay: i * .1 }} key={i}>
                    <MinimalBlogPost blog={blog} index={i} />
                  </AnimationWrapper>
                })
            }


          </InPageNavigation>



        </div>

        <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden ">
      
          <div className="flex flex-col gap-10">

            <div>
              <h1 className="font-medium text-xl mb-8">
                stories from all interests
              </h1>

              <div className="flex gap-3 flex-wrap">

                {
                  categories.map((category, i) => {
                    return <button onClick={loadBlogByCategory} className={"tag " + (pageState == category ? "bg-black text-white" : " ")} key={i} >

                      {category}
                    </button>
                  })
                }

              </div>
            </div>


            <div>

              <h1 className="font-medium text-xl mb-8">Trending
                <i className="fi fi-rr-arrow-trend-up"></i>
              </h1>


              {
                trendingBlogs == null ? <Loader />
                  :
                  trendingBlogs.map((blog, i) => {
                    return <AnimationWrapper transition={{ duration: 1, delay: i * .1 }} key={i}>
                      <MinimalBlogPost blog={blog} index={i} />
                    </AnimationWrapper>
                  })
              }

            </div>
          </div>

        </div>
      </section>

    </AnimationWrapper>

  )
}

export default Homepage;
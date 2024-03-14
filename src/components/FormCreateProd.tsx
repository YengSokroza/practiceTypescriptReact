import { Button, Label, TextInput, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';

type ErrorType = {
    title: string;
    price:  string;
}


export default function FormCreateProd({getDataForm}:any) {
    const [title,setTitle] = useState("");
    const [price,setprice] = useState(0);
    const [description,setdescription] = useState("");
    const [category,setCategory] = useState("shirt");
    const [image,setImage] = useState("https://thumbs.dreamstime.com/b/generic-person-gray-photo-placeholder-man-silhouette-white-background-144511705.jpg")

    const [error,setError] = useState<ErrorType>({
        title: "default",
        price: ""

    });

    // valiadation
    useEffect(() => {

        if(title.length < 3){
            setError((prev) => {
                console.log(prev)
                return {...prev, 
                    title: "Title must be at least 3 characters",
                    };
            })
        }else{
            setError((prev) => {
                return {...prev, 
                    title: "",
                    };
            })
        }


        if(price < 0){
            setError((prev) => {
                console.log(prev);
                return {...prev, 
                    price: "Price must be greater than 0",
                    };
                
            })
        }else{
            setError((prev) => {
                return {...prev, 
                    price: "",
                    };
            })
        }
    },[title, price])


    useEffect(() => {
        getDataForm({title,price,description,category,image})
    },[title,price,description,category,image])

  return (
    <form className="flex max-w-md flex-col gap-4">
    <div>
      <div className="mb-2 block">
        <Label htmlFor="id" value="Product Title" />
      </div>
      <TextInput id="id" type="text" placeholder="Apple Watch" required onChange={(e) => setTitle((e.target.value))}/>
      {error.title && <p className='text-red-500'>{error.title}</p>}
    </div>
    <div>
      <div className="mb-2 block">
        <Label htmlFor="price" value="Product Price" />
      </div>
      <TextInput id="price" type="number" required onChange={(e) => setprice(parseFloat(e.target.value))}/>
      {error.price && <p className='text-red-500'>{error.price}</p>}
    </div>
    <div>
      <div className="mb-2 block">
        <Label htmlFor="description" value="Product description" />
      </div>
      <Textarea id="description"  required />
    </div>
 
    
  </form>
  )
}

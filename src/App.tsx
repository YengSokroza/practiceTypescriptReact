
import { useEffect, useState } from 'react'
import './App.css'
import CardComponent from './components/CardComponent'
import { Button, Modal } from 'flowbite-react';
import { Spinner } from 'flowbite-react'
import FormCreateProd from './components/FormCreateProd';

type Status = 'idle' | 'loading' | 'success' | 'error'
type Product = {
  readonly id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string
}
function App() {
  // const [count, SetCount]  = useState(0)
  const [products,setProducts] = useState<Product[]>([])
  const [status,setStatus] = useState<Status>('idle')
  const [openModal, setOpenModal] = useState(false);
  const [dataForm,setDataForm] = useState({});

  useEffect(() => {
    setStatus("loading")
    fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
      setProducts(data)
      setStatus("success")
    }).catch(err => {
      setStatus("error")
    })
  },[])

  if(status === "loading"){
    return(
      <div className='grid place-content-center items-center'>
        <Spinner/>
      </div>
    )
  }

  function getDataForm(product:Product){
    setDataForm(product);
    
  }

  const createProduct = () => {
    fetch('https://fakestoreapi.com/products',{
            method:"POST",
            body:JSON.stringify(dataForm),
            headers: {
              "content-type" : "application/json",
            },
          })
          .then((res) => res.json())
          .then((data) => {
            console.log("create product successfully");
            console.log(data);
            
          })
          .catch((err) => {
            console.log(err);
            
          })

          setOpenModal(false)
        
        }
          

  return (
    <>
      <div className='my-6 flex justify-end'>
        <Button onClick={() => setOpenModal(true)}>Create Product</Button>
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Create a Product</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <FormCreateProd getDataForm = {getDataForm}/>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => createProduct()}>Create</Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
      </div>

      <div className='grid grid-flow-row grid-cols-4 gap-8'>
        {products.map(product => <CardComponent 
          key={product.id} title={product.title} 
          image={product.image} price={product.price}
        />)}
        
      </div>
     
    </>
  )
}

export default App

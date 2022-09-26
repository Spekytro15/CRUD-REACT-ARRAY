import { ArrowFatRight, FilePlus, NumberCircleEight, Pencil, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { Create_UUID } from "../service/service";

interface Produtos{
    uuid:String;
    nome:String;
    quantidade:String;
    preco:String;
}


export function Home(){ 

//------Create inputs

    const [nome, setNome] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [preco, setPreco] = useState("");

//------update inputs

    const [uuid, setuuid] = useState("");
    const [nomeUpdate, setNomeUpdate] = useState("");
    const [quantidadeUpdate, setQuantidadeUpdate] = useState("");
    const [precoUpdate, setPrecoUpdate] = useState("");

// array Produtos (Objetos) 


    const  [produtos, setProdutos] = useState<Produtos []>([
     {
        uuid:"",
        nome: "", 
        quantidade:"",
        preco: ""
    }]
    );


// Create (Push ou Set)


    const Create = () => {
        //  Verificar inputs vazios

        if (!nome || !quantidade || !preco){
            alert("Preencha os campos")
        }

        //  push com antigo objetos e os novos 

        setProdutos([...produtos,{
            uuid:Create_UUID(),
            nome: nome, 
            quantidade:quantidade,
            preco: preco
        }])

        //  Passando os value dos inputs para vazio

        setNome("")
        setQuantidade("")
        setPreco("")

        }


// save Update


    const CreateUpdate = () => {
        //map no produtos, verifico se e o mesmo da variavel uuid e altero o objeto (Salvando)
       produtos.map((p , i)=>{
            if(p.uuid == uuid){
                setProdutos([{
                  uuid:p.uuid,
                  nome: nomeUpdate, 
                  quantidade:quantidadeUpdate,
                  preco: precoUpdate
              }])
            }
          })
        }   


// Buscando valor e adicionando aos inputs de updade


    const ButtonEditUpdate = (e: React.MouseEvent<HTMLElement>, uuid: String) =>{
        e.preventDefault();
        produtos.filter((p) => p.uuid == uuid).map((produto: Produtos) => {
            setuuid(produto.uuid)
            setNomeUpdate(produto.nome)
            setQuantidadeUpdate(produto.quantidade)
            setPrecoUpdate(produto.preco)
        })

        
    
      
        }


// Delete


    //filter no produtos e comparo o uuid e tudo se != eu mantenho e oque for == eu removo
    const Delete = (e: React.MouseEvent<HTMLElement>, uuid: String) =>{
    e.preventDefault();
    setProdutos(produtos.filter((p) => p.uuid !== uuid))
        }


    return ( 
        <div className="flex flex-row">
            <div className="flex flex-col w-[40vh] border-r border-white-800 h-[150vh] bg-white items-center border-b">
                     <div className="text-[25pt]">
                        <span className="text-green-600">C</span>
                        <span className="text-red-400">RU</span>
                        <span className="text-yellow-200">D</span>
                    </div>
                    <div className="mt-5">
                        <button 
                         className="bg-green-700 w-[33vh] p-2 flex items-center justify-center hover:bg-green-900"
                        >
                            <span className="font-bold text-[15pt] text-white">Create</span>
                        </button>
                    </div>
            </div>
            <div className="flex flex-col w-[100%]  h-[100vh] inset-0 items-center">
                     <div className="mt-8 w-[88%]">
                            <h1 className="text-[25pt] flex items-center">Produtos 
                                <FilePlus className="ml-5 animate-bounce" size={32} color="#ffffff" weight="regular" />
                            </h1> 
                            <hr />
                            <div className="h-[60vh] overflow-auto scroll-edit">
                                    <table className="table-auto w-[100%]  text-center justify-center items-center">
                                            <thead>
                                                <tr>
                                                <th>Cod</th>
                                                <th >Nome</th>
                                                <th>Preço</th>
                                                <th>Quantidade</th>
                                                
                                                </tr>
                                            </thead >
                                            {produtos.map((produto, indice)=> (
                                                <tbody key={indice}className="bg-gray-700">
                                                <tr>
                                                <td>{produto.uuid}</td>
                                                <td >{produto.nome}</td>
                                                <td>{produto.preco}R$</td>
                                                <td>{produto.quantidade}</td>
                                                <td><button onClick={ (e) => ButtonEditUpdate(e,produto.uuid)} ><Pencil className="hover:text-green-700" size={20} weight="light" /></button></td>
                                                <td><button onClick={ (e) => Delete(e, produto.uuid)}><Trash className="hover:text-red-700" size={20}  weight="light"  /></button></td>
                                                </tr>
                                            </tbody>
                                            
                                            ) ) }
                                    </table>
                    </div>
                    <hr />
                    <div className="flex w-[100%] items-center mt-5 bg-white h-[70vh] rounded-[15px]">
                       <div className="flex flex-col items-center w-[50%]">
                           
                            <h1 className="font-bold text-[25pt] mt-10">Cadastros</h1>
                           
                            <input onChange={e => setNome(e.target.value)} value={nome}className="w-[50vh] p-3 m-3 border border-stone-500 bg-stone-300 rounded" type="text" required placeholder="Nome do produto" />
                            <input onChange={e => setPreco(e.target.value)} value={preco} className="w-[50vh] p-3 m-3 border border-stone-500 bg-stone-300 rounded" required  type="number" placeholder="Preço"/>
                            <input onChange={e => setQuantidade(e.target.value)} value={quantidade} className="w-[50vh] p-3 m-3 border border-stone-500 bg-stone-300  rounded" required  type="number" placeholder="Quantidade" />

                            <button onClick={()=> Create()} className="bg-green-400 p-2 text-white font-bold rounded hover:bg-green-800 items-center justify-center">Cadastrar</button>
                       </div>

                    <div className="flex flex-col items-center justify-center w-[60%] bg-green-800 h-[70vh] rounded-[15px]">
                        <div className="flex flex-col items-center w-[50%]"> 
                                    <h1 className="font-bold text-[25pt] mt-10">Cadastros</h1>
                                <label htmlFor="">
                                    Nome
                                <input onChange={e => setNomeUpdate(e.target.value)} value={nomeUpdate}className="w-[50vh] p-3 m-3 border border-stone-500 bg-stone-300 rounded" type="text" required  placeholder="Selecione um Produto" /> 
                                </label>
                                <label htmlFor="">
                                    Preço :
                                <input onChange={e => setPrecoUpdate(e.target.value)} value={precoUpdate} className="w-[50vh] p-3 m-3 border border-stone-500 bg-stone-300 rounded" type="number" required  placeholder="Selecione um Produto"/>

                                </label>
                                <label htmlFor="">
                                    Quantidade :
                                <input onChange={e => setQuantidadeUpdate(e.target.value)} value={quantidadeUpdate} className="w-[50vh] p-3 m-3 border border-stone-500 bg-stone-300 rounded" type="number" required  placeholder="Selecione um Produto" />
                                    </label>
                                <button onClick={()=> CreateUpdate()} className="bg-green-400 p-2 text-white font-bold rounded hover:bg-green-800 items-center justify-center">Atualizar</button>
                        </div>
                    </div>
                    </div>
                </div>

            </div>
                    
        </div>
           )
}


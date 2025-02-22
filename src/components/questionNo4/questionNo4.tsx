interface IUser {
    name: string;
    email: string;
    age: number;
}

export default function QuestionNo4({ name, email, age }: IUser) {
    return (
        
        <div className="m-8 w-96 bg-stone-800 text-center border-4 border-pink-300 rounded-2xl p-4 shadow-gray shadow-2xl w-80">
            <h2 className="text-pink-400 text-xl font-semibold">{name}</h2>
            <p className="text-pink-300">Email: {email}</p>
            <p className="text-pink-200">Age: {age}</p>
        </div>
    
    )
}

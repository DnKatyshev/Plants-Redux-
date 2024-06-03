// react-dependencies
import { useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"

// project-component's imports

// project's styles/img
import './form.scss'


export const Form = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({mode: 'onBlur'})

    const onSubmit = (data) => {
        console.log(data)
        reset()
        setSearchParams('done')
    }

    return(
        <form id="form" className="form" method="post" onSubmit={handleSubmit(onSubmit)}>

            <div className="form__group">
                <label htmlFor="input-1" className="form__label">Your surname</label>
                <input className="form__input" id="input-1" type="text" placeholder="Your name"
                    {
                        ...register('name', {
                            required: 'Write your name, please',
                            minLength: {
                                value: 2,
                                message: 'At least 2 charackters!'
                            }
                        })
                    }
                />
                {errors?.name && <span className="form__error">{errors?.name?.message}</span>}
                
            </div>


            <div className="form__group">
                <label htmlFor="input-2" className="form__label">Your surname</label>
                <input className="form__input" id="input-2" type="email" placeholder="Your email"
                    {
                        ...register('email', {
                            required: 'Write your email, please',
                            pattern: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
                        })
                    }
                />
                {errors?.email && <span className="form__error">{errors?.email?.message}</span>}
            </div>


            <div className="form__group">
                <label htmlFor="input-3" className="form__label">Additional comments:</label>
                <textarea className="form__textarea" id="input-3" placeholder="Comments"/>
            </div>


            <button className="form__btn btn" type="submit">GO</button>
        </form>
    )
}
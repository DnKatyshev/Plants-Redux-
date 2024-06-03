// react-dependencies
import { useContext } from "react"

// project-component's imports
import { CartContext } from "../../context/Context"

// project's styles/img
import './cartItem.scss'


export const CartItem = ({data}) => {

    const {img, title, info, price, id} = data

    const {cartMain, addToCart, removeFromCart, removeCompletelyFromCart, addArbitraryCout} = useContext(CartContext)


    return(
        <li className="cart__item">

            <div className="cart__item-main">
                <div className="cart__item-info">
                    <img src={img} alt="" />
                    <h2>{title}</h2>
                    <p>{info}</p>
                    <h3>{price}</h3>
                </div>
                <svg x="0px" y="0px" width="50" height="50" viewBox="0 0 80 80" onClick={() => removeCompletelyFromCart(id)}>
<path d="M 35 4 C 33.355469 4 32 5.355469 32 7 L 32 9 L 14 9 C 12.355469 9 11 10.355469 11 12 L 11 13 L 11.417969 13 C 11.859375 14.105469 12.742188 15 14 15 L 15.082031 15 L 19.679688 66.445313 C 19.910156 69.015625 22.078125 71 24.65625 71 L 55.34375 71 C 57.921875 71 60.089844 69.015625 60.320313 66.445313 L 64.917969 15 L 66 15 C 67.257813 15 68.140625 14.105469 68.582031 13 L 69 13 L 69 12 C 69 10.355469 67.644531 9 66 9 L 48 9 L 48 7 C 48 5.355469 46.644531 4 45 4 Z M 35 6 L 45 6 C 45.566406 6 46 6.433594 46 7 L 46 9 L 34 9 L 34 7 C 34 6.433594 34.433594 6 35 6 Z M 14 11 L 66 11 C 66.566406 11 67 11.433594 67 12 C 67 12.566406 66.566406 13 66 13 L 14 13 C 13.433594 13 13 12.566406 13 12 C 13 11.433594 13.433594 11 14 11 Z M 17.09375 15 L 62.90625 15 L 58.328125 66.265625 C 58.1875 67.824219 56.90625 69 55.34375 69 L 24.65625 69 C 23.097656 69 21.8125 67.824219 21.671875 66.265625 Z M 58.003906 21.996094 C 57.480469 21.992188 57.042969 22.394531 57 22.917969 C 56.957031 23.46875 57.367188 23.949219 57.917969 23.996094 C 58.46875 24.039063 58.949219 23.625 58.996094 23.078125 C 59.039063 22.527344 58.625 22.042969 58.078125 22 C 58.054688 21.996094 58.03125 21.996094 58.003906 21.996094 Z M 22.019531 22 C 21.984375 22 21.953125 22 21.921875 22.003906 C 21.371094 22.046875 20.957031 22.53125 21 23.078125 C 21.046875 23.628906 21.527344 24.039063 22.078125 23.996094 C 22.628906 23.953125 23.039063 23.472656 22.996094 22.921875 C 22.957031 22.410156 22.535156 22.011719 22.019531 22 Z M 32.972656 22 C 32.421875 22.015625 31.984375 22.476563 32 23.027344 C 32.015625 23.578125 32.476563 24.015625 33.027344 24 C 33.578125 23.984375 34.015625 23.527344 34 22.972656 C 33.984375 22.421875 33.523438 21.988281 32.972656 22 Z M 46.953125 22 C 46.429688 22.023438 46.015625 22.449219 46 22.972656 C 45.984375 23.527344 46.421875 23.984375 46.972656 24 C 47.523438 24.015625 47.984375 23.578125 48 23.027344 C 48.011719 22.476563 47.578125 22.015625 47.027344 22 C 47.003906 22 46.976563 22 46.953125 22 Z M 57.6875 25.984375 C 57.164063 25.980469 56.726563 26.382813 56.683594 26.90625 C 56.640625 27.453125 57.050781 27.9375 57.601563 27.980469 C 58.152344 28.023438 58.632813 27.613281 58.675781 27.0625 C 58.722656 26.511719 58.308594 26.03125 57.761719 25.984375 C 57.738281 25.984375 57.714844 25.984375 57.6875 25.984375 Z M 22.339844 25.988281 C 22.304688 25.988281 22.269531 25.988281 22.238281 25.992188 C 21.6875 26.035156 21.277344 26.515625 21.320313 27.066406 C 21.363281 27.617188 21.847656 28.027344 22.394531 27.984375 C 22.945313 27.941406 23.359375 27.457031 23.3125 26.90625 C 23.273438 26.394531 22.851563 26 22.339844 25.988281 Z M 33.078125 26 C 32.527344 26.015625 32.09375 26.476563 32.109375 27.027344 C 32.121094 27.578125 32.582031 28.015625 33.136719 28 C 33.6875 27.984375 34.121094 27.523438 34.109375 26.972656 C 34.09375 26.421875 33.632813 25.984375 33.078125 26 Z M 46.847656 26 C 46.324219 26.023438 45.90625 26.449219 45.890625 26.972656 C 45.878906 27.527344 46.3125 27.984375 46.863281 28 C 47.417969 28.015625 47.878906 27.578125 47.890625 27.027344 C 47.90625 26.476563 47.472656 26.015625 46.921875 26 C 46.894531 26 46.871094 26 46.847656 26 Z M 57.375 29.972656 C 56.847656 29.96875 56.410156 30.371094 56.371094 30.890625 C 56.324219 31.441406 56.734375 31.925781 57.285156 31.96875 C 57.835938 32.011719 58.316406 31.601563 58.359375 31.050781 C 58.40625 30.5 57.996094 30.019531 57.445313 29.972656 C 57.421875 29.972656 57.398438 29.972656 57.375 29.972656 Z M 22.65625 29.972656 C 22.621094 29.972656 22.585938 29.976563 22.554688 29.980469 C 22.003906 30.023438 21.59375 30.503906 21.636719 31.054688 C 21.679688 31.605469 22.164063 32.015625 22.714844 31.972656 C 23.261719 31.929688 23.675781 31.445313 23.628906 30.894531 C 23.589844 30.382813 23.167969 29.984375 22.65625 29.972656 Z M 33.1875 30 C 32.636719 30.011719 32.199219 30.472656 32.214844 31.027344 C 32.230469 31.578125 32.691406 32.011719 33.242188 32 C 33.792969 31.984375 34.230469 31.523438 34.214844 30.96875 C 34.199219 30.417969 33.738281 29.984375 33.1875 30 Z M 46.738281 30 C 46.214844 30.023438 45.796875 30.449219 45.78125 30.972656 C 45.769531 31.523438 46.203125 31.984375 46.753906 32 C 47.308594 32.015625 47.769531 31.578125 47.78125 31.027344 C 47.796875 30.476563 47.363281 30.015625 46.8125 30 C 46.785156 30 46.761719 30 46.738281 30 Z M 57.058594 33.957031 C 56.53125 33.953125 56.09375 34.355469 56.050781 34.878906 C 56.011719 35.429688 56.421875 35.910156 56.96875 35.953125 C 57.519531 36 58.003906 35.589844 58.046875 35.039063 C 58.089844 34.488281 57.679688 34.007813 57.128906 33.964844 C 57.105469 33.960938 57.082031 33.960938 57.058594 33.957031 Z M 22.96875 33.964844 C 22.9375 33.960938 22.902344 33.964844 22.871094 33.96875 C 22.320313 34.011719 21.910156 34.492188 21.953125 35.042969 C 21.996094 35.59375 22.480469 36.003906 23.03125 35.960938 C 23.578125 35.917969 23.992188 35.433594 23.949219 34.886719 C 23.90625 34.371094 23.484375 33.972656 22.96875 33.964844 Z M 33.296875 34 C 32.746094 34.011719 32.308594 34.472656 32.324219 35.023438 C 32.339844 35.574219 32.796875 36.011719 33.347656 35.996094 C 33.902344 35.980469 34.335938 35.523438 34.324219 34.96875 C 34.308594 34.417969 33.847656 33.984375 33.296875 34 Z M 46.628906 34 C 46.105469 34.019531 45.691406 34.445313 45.675781 34.96875 C 45.660156 35.523438 46.097656 35.980469 46.648438 35.996094 C 47.199219 36.011719 47.660156 35.574219 47.671875 35.023438 C 47.6875 34.472656 47.253906 34.011719 46.703125 34 C 46.679688 33.996094 46.652344 33.996094 46.628906 34 Z M 56.738281 37.945313 C 56.214844 37.941406 55.777344 38.34375 55.734375 38.863281 C 55.691406 39.414063 56.101563 39.898438 56.652344 39.941406 C 57.203125 39.984375 57.683594 39.574219 57.730469 39.023438 C 57.769531 38.472656 57.359375 37.992188 56.8125 37.949219 C 56.789063 37.945313 56.765625 37.945313 56.738281 37.945313 Z M 23.285156 37.953125 C 23.253906 37.949219 23.21875 37.949219 23.1875 37.953125 C 22.636719 37.996094 22.226563 38.480469 22.269531 39.03125 C 22.3125 39.578125 22.796875 39.992188 23.34375 39.949219 C 23.894531 39.902344 24.308594 39.421875 24.265625 38.871094 C 24.222656 38.359375 23.800781 37.960938 23.285156 37.953125 Z M 33.40625 37.996094 C 32.851563 38.011719 32.417969 38.46875 32.433594 39.019531 C 32.445313 39.574219 32.90625 40.007813 33.457031 39.996094 C 34.011719 39.980469 34.445313 39.519531 34.433594 38.96875 C 34.417969 38.417969 33.957031 37.980469 33.40625 37.996094 Z M 46.519531 37.996094 C 45.996094 38.019531 45.582031 38.445313 45.566406 38.96875 C 45.550781 39.519531 45.988281 39.980469 46.539063 39.996094 C 47.089844 40.011719 47.550781 39.574219 47.566406 39.023438 C 47.582031 38.472656 47.144531 38.011719 46.59375 37.996094 C 46.570313 37.996094 46.546875 37.996094 46.519531 37.996094 Z M 56.421875 41.933594 C 55.898438 41.929688 55.460938 42.332031 55.417969 42.855469 C 55.375 43.402344 55.785156 43.886719 56.335938 43.929688 C 56.886719 43.972656 57.367188 43.5625 57.410156 43.011719 C 57.453125 42.460938 57.042969 41.980469 56.496094 41.9375 C 56.46875 41.933594 56.445313 41.933594 56.421875 41.933594 Z M 23.605469 41.9375 C 23.570313 41.9375 23.539063 41.9375 23.503906 41.9375 C 22.953125 41.984375 22.542969 42.464844 22.585938 43.015625 C 22.628906 43.566406 23.113281 43.976563 23.660156 43.933594 C 24.210938 43.890625 24.625 43.40625 24.578125 42.859375 C 24.539063 42.347656 24.117188 41.949219 23.605469 41.9375 Z M 33.511719 41.996094 C 32.960938 42.007813 32.523438 42.46875 32.539063 43.019531 C 32.554688 43.574219 33.015625 44.007813 33.566406 43.996094 C 34.117188 43.980469 34.554688 43.519531 34.539063 42.96875 C 34.523438 42.414063 34.0625 41.980469 33.511719 41.996094 Z M 46.417969 41.996094 C 45.890625 42.015625 45.472656 42.441406 45.457031 42.96875 C 45.445313 43.519531 45.878906 43.980469 46.433594 43.996094 C 46.984375 44.007813 47.445313 43.574219 47.457031 43.019531 C 47.472656 42.46875 47.039063 42.007813 46.484375 41.996094 C 46.464844 41.992188 46.4375 41.992188 46.417969 41.996094 Z M 56.109375 45.921875 C 55.582031 45.914063 55.144531 46.316406 55.101563 46.84375 C 55.058594 47.390625 55.46875 47.875 56.019531 47.917969 C 56.570313 47.960938 57.050781 47.550781 57.09375 47 C 57.140625 46.449219 56.726563 45.96875 56.175781 45.921875 C 56.15625 45.921875 56.132813 45.921875 56.109375 45.921875 Z M 23.921875 45.925781 C 23.886719 45.925781 23.855469 45.925781 23.824219 45.925781 C 23.273438 45.972656 22.859375 46.453125 22.90625 47.003906 C 22.949219 47.554688 23.429688 47.964844 23.980469 47.921875 C 24.53125 47.878906 24.941406 47.394531 24.898438 46.84375 C 24.855469 46.332031 24.433594 45.9375 23.921875 45.925781 Z M 33.621094 45.992188 C 33.070313 46.007813 32.632813 46.46875 32.648438 47.019531 C 32.664063 47.570313 33.125 48.007813 33.675781 47.992188 C 34.226563 47.976563 34.664063 47.515625 34.648438 46.964844 C 34.632813 46.414063 34.171875 45.976563 33.621094 45.992188 Z M 46.308594 45.996094 C 45.78125 46.015625 45.363281 46.441406 45.347656 46.96875 C 45.335938 47.519531 45.769531 47.980469 46.324219 47.996094 C 46.875 48.007813 47.335938 47.574219 47.347656 47.019531 C 47.363281 46.46875 46.929688 46.007813 46.375 45.996094 C 46.355469 45.992188 46.328125 45.992188 46.308594 45.996094 Z M 55.792969 49.90625 C 55.265625 49.902344 54.828125 50.304688 54.785156 50.828125 C 54.742188 51.378906 55.152344 51.859375 55.703125 51.90625 C 56.253906 51.949219 56.734375 51.539063 56.78125 50.988281 C 56.824219 50.4375 56.410156 49.957031 55.859375 49.910156 C 55.839844 49.910156 55.816406 49.910156 55.792969 49.90625 Z M 24.238281 49.910156 C 24.203125 49.910156 24.171875 49.914063 24.140625 49.917969 C 23.589844 49.960938 23.175781 50.441406 23.21875 50.992188 C 23.265625 51.542969 23.746094 51.953125 24.296875 51.90625 C 24.847656 51.863281 25.257813 51.382813 25.214844 50.832031 C 25.171875 50.320313 24.75 49.921875 24.238281 49.910156 Z M 33.730469 49.988281 C 33.175781 50.003906 32.742188 50.464844 32.753906 51.015625 C 32.769531 51.570313 33.230469 52.003906 33.78125 51.988281 C 34.335938 51.976563 34.769531 51.515625 34.753906 50.964844 C 34.742188 50.410156 34.28125 49.976563 33.730469 49.988281 Z M 46.199219 49.996094 C 45.671875 50.015625 45.257813 50.441406 45.242188 50.96875 C 45.226563 51.519531 45.664063 51.976563 46.214844 51.992188 C 46.765625 52.007813 47.226563 51.570313 47.242188 51.019531 C 47.257813 50.46875 46.820313 50.007813 46.269531 49.996094 C 46.246094 49.992188 46.222656 49.992188 46.199219 49.996094 Z M 55.472656 53.894531 C 54.949219 53.890625 54.511719 54.292969 54.46875 54.816406 C 54.425781 55.367188 54.835938 55.847656 55.386719 55.890625 C 55.9375 55.9375 56.417969 55.523438 56.464844 54.972656 C 56.507813 54.425781 56.09375 53.941406 55.546875 53.898438 C 55.523438 53.894531 55.5 53.894531 55.472656 53.894531 Z M 24.554688 53.902344 C 24.519531 53.898438 24.488281 53.898438 24.453125 53.902344 C 23.90625 53.945313 23.492188 54.429688 23.535156 54.980469 C 23.582031 55.527344 24.0625 55.941406 24.613281 55.894531 C 25.164063 55.851563 25.574219 55.371094 25.53125 54.820313 C 25.488281 54.308594 25.066406 53.910156 24.554688 53.902344 Z M 33.835938 53.988281 C 33.285156 54.003906 32.847656 54.464844 32.863281 55.015625 C 32.878906 55.570313 33.339844 56.003906 33.890625 55.988281 C 34.441406 55.976563 34.878906 55.515625 34.863281 54.964844 C 34.847656 54.410156 34.386719 53.976563 33.835938 53.988281 Z M 46.09375 53.992188 C 45.566406 54.015625 45.148438 54.441406 45.136719 54.964844 C 45.121094 55.515625 45.554688 55.976563 46.109375 55.988281 C 46.660156 56.003906 47.121094 55.570313 47.136719 55.015625 C 47.148438 54.464844 46.714844 54.007813 46.160156 53.992188 C 46.140625 53.992188 46.113281 53.992188 46.09375 53.992188 Z M 55.15625 57.882813 C 54.632813 57.878906 54.195313 58.28125 54.152344 58.800781 C 54.109375 59.351563 54.519531 59.835938 55.066406 59.878906 C 55.617188 59.921875 56.101563 59.511719 56.144531 58.960938 C 56.1875 58.410156 55.777344 57.929688 55.226563 57.886719 C 55.203125 57.882813 55.179688 57.882813 55.15625 57.882813 Z M 24.871094 57.886719 C 24.835938 57.886719 24.804688 57.886719 24.769531 57.890625 C 24.222656 57.933594 23.808594 58.417969 23.855469 58.96875 C 23.898438 59.515625 24.378906 59.929688 24.929688 59.886719 C 25.480469 59.839844 25.890625 59.359375 25.847656 58.808594 C 25.808594 58.296875 25.386719 57.898438 24.871094 57.886719 Z M 33.945313 57.988281 C 33.394531 58.003906 32.957031 58.464844 32.972656 59.015625 C 32.988281 59.566406 33.445313 60.003906 34 59.988281 C 34.550781 59.972656 34.984375 59.511719 34.96875 58.960938 C 34.957031 58.410156 34.496094 57.972656 33.945313 57.988281 Z M 45.980469 57.992188 C 45.457031 58.015625 45.039063 58.441406 45.027344 58.964844 C 45.011719 59.515625 45.445313 59.976563 46 59.988281 C 46.550781 60.003906 47.011719 59.570313 47.027344 59.015625 C 47.039063 58.464844 46.605469 58.007813 46.050781 57.992188 C 46.027344 57.992188 46.003906 57.992188 45.980469 57.992188 Z M 54.839844 61.871094 C 54.316406 61.867188 53.875 62.269531 53.835938 62.792969 C 53.792969 63.339844 54.203125 63.820313 54.753906 63.863281 C 55.304688 63.90625 55.785156 63.5 55.828125 62.949219 C 55.871094 62.398438 55.460938 61.917969 54.910156 61.875 C 54.886719 61.871094 54.863281 61.871094 54.839844 61.871094 Z M 25.1875 61.875 C 25.152344 61.875 25.121094 61.875 25.089844 61.878906 C 24.539063 61.921875 24.125 62.40625 24.171875 62.953125 C 24.214844 63.503906 24.695313 63.914063 25.246094 63.871094 C 25.796875 63.828125 26.207031 63.347656 26.164063 62.796875 C 26.125 62.285156 25.703125 61.886719 25.1875 61.875 Z M 34.050781 61.984375 C 33.5 62 33.066406 62.460938 33.078125 63.015625 C 33.09375 63.566406 33.554688 64 34.109375 63.984375 C 34.660156 63.972656 35.09375 63.511719 35.078125 62.957031 C 35.066406 62.40625 34.605469 61.972656 34.050781 61.984375 Z M 45.875 61.988281 C 45.351563 62.011719 44.933594 62.4375 44.917969 62.964844 C 44.902344 63.515625 45.339844 63.972656 45.890625 63.988281 C 46.441406 64.003906 46.902344 63.566406 46.917969 63.015625 C 46.933594 62.464844 46.496094 62.003906 45.945313 61.988281 C 45.921875 61.988281 45.898438 61.988281 45.875 61.988281 Z"></path></svg>
            </div>


            <div className="cart__item-options">
                <button onClick={() => removeFromCart(id)}> - </button>
                <input
                    value={cartMain[id]}
                    onChange={(e) => addArbitraryCout(Number(e.target.value), id)}
                />
                <button onClick={() => addToCart(id)}> + </button>
            </div>

        </li>
    )
} 
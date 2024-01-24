import FormImage from '../assets/form-redeem.png'
import ButtonGreen from '../components/Button-green'
import ButtonOutline from '../components/Button-outline'

export default function FormRedeem(){
    return(
        <div className="form-redeem flex flex-col items-center justify-center">
            <img className='w-fit mt-20' src={FormImage} alt="image-form" />
            <div className="number-phone my-4">
                <p className='font-medium'>Nomor handphone yang dimasukkan harus benar dan aktif</p>
                <input type="text" className='mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' placeholder='Masukkan Nomor HP Anda' required  />
            </div>
            <div className="btn-form flex gap-8">
                <ButtonOutline text='Kembali'></ButtonOutline>
                <ButtonGreen text='Kirim'></ButtonGreen>
            </div>
        </div>
    )
}
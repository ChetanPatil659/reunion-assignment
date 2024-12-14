import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import loginIllus from "@/assets/loginIllus.jpg"
import { Link } from "react-router"
import { useDispatch } from "react-redux"
import { registerUser } from "@/store/userSlice"
import { getTodo } from "@/store/todoSlice"
 
const formSchema = z.object({
  userName: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(2).max(50),
})

export default function SignupPage() {

    const dispatch = useDispatch();
    const form = useForm<z.infer<typeof formSchema>>({  
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          userName: "",
          password: "",
        },
      })
     
      function onSubmit(values: z.infer<typeof formSchema>) {
        dispatch(registerUser(values))
        dispatch(getTodo())
      }
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden w-1/2 bg-gray-100 dark:bg-gray-800 lg:block">
        <img
          src={loginIllus}
          alt="Login Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
          style={{ aspectRatio: "1920/1080", objectFit: "cover" }}
        />
      </div>
      <div className="flex w-full items-center justify-center px-4 py-12 lg:w-1/2">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#054C60] dark:text-gray-50">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-[#054C60] dark:text-gray-400">
              Or{" "}
              <Link
                to="/"
                className="font-medium text-[#054C60] hover:text-[#054C60]/90 dark:text-[#054C60] dark:hover:text-[#054C60]/90"
              >
                login using existing account
              </Link>
            </p>
          </div>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#054C60] dark:text-gray-300">
                Full name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  {...form.register("userName")}
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#054C60] focus:outline-none focus:ring-[#054C60] dark:border-gray-600 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-400"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#054C60] dark:text-gray-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  {...form.register("email")}
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#054C60] focus:outline-none focus:ring-[#054C60] dark:border-gray-600 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-400"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#054C60] dark:text-gray-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  {...form.register("password")}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#054C60] focus:outline-none focus:ring-[#054C60] dark:border-gray-600 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-400"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full justify-center rounded-md bg-[#054C60] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#054C60]/90 focus:outline-none focus:ring-2 focus:ring-[#054C60] focus:ring-offset-2 dark:bg-[#054C60] dark:hover:bg-[#054C60]/90 dark:focus:ring-[#054C60] dark:focus:ring-offset-gray-950"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

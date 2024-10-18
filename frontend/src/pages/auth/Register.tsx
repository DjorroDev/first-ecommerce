import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRegisterMutation } from "@/services/authService";
import { error } from "console";
import { Box } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    address: "",
    isAdmin: false,
    isSeller: false,
  });

  const [register, { isLoading, error }] = useRegisterMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(registerForm).unwrap;
      console.log(registerForm);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      console.error(error);
    }
  };

  return (
    <div className="h-[80vh] flex items-center">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                value={registerForm.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="johnDoe / JohnStore"
                value={registerForm.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={registerForm.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="Roles">Roles</Label>
              <div className="flex gap-2">
                <Checkbox
                  id="isSeller"
                  name="isSeller"
                  // value={registerForm.isSeller}
                  checked={registerForm.isSeller}
                  // onChange={handleCheckboxChange}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange({
                      target: {
                        name: "isSeller",
                        checked,
                      },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                />
                <Label htmlFor="isSeller">Seller</Label>
              </div>
              <div className="flex gap-2">
                <Checkbox
                  id="isAdmin"
                  name="isAdmin"
                  checked={registerForm.isAdmin}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange({
                      target: {
                        name: "isAdmin",
                        checked,
                      },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                />
                <Label htmlFor="isAdmin">Admin</Label>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={registerForm.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                placeholder="Your address"
                value={registerForm.address}
                onChange={handleChange}
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">error</p>}

            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;

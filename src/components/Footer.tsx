import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import Link from "next/link";

function Footer() {
  return (
    <footer>
      <div className="bg-midnight flex py-6">
        <div className="mx-auto flex flex-col items-center">
          <h2 className="text-2xl font-bold text-white mb-5">
            Receba as nossas novidades
          </h2>
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="Digite seu email..."
              className="bg-sakura text-white rounded-xl px-4 py-5 drop-shadow-lg shadow-black/40 border-none placeholder:text-white placeholder:italic w-xl"
            />
            <Button className="bg-white text-sakura hover:bg-white/80 cursor-pointer font-bold text-lg py-5 rounded-xl">
              Cadastrar
            </Button>
          </div>
          <div className="flex gap-2 mt-4">
            <Checkbox id="terms" className="checked:bg-white border-2" />
            <Label htmlFor="terms" className="text-white">
              Concordo com a{" "}
              <Link href="/" className="underline underline-offset-2">
                Política de Privacidade
              </Link>{" "}
              e aceito receber comunicações
            </Label>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

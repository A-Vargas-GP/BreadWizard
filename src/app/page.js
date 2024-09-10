//Running Server: pnpm dev

'use client'
import Image from "next/image";
import React from "react"
import {Slider} from "@nextui-org/slider";
import {Input} from "@nextui-org/input";
import {Tabs, Tab} from "@nextui-org/tabs";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Table, TableHeader, TableBody, TableColumn, TableRow,TableCell} from "@nextui-org/table";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@nextui-org/navbar";
import {Link} from "@nextui-org/link";
import Head from 'next/head'

/* 
- UI done: Based on hydration and X loaves = give X grams of water, flour, salt, and starter
- UI done: Based on hydration and X grams of flour = calculate potential X grams of water, flour, salt, and starter
- UI done: Put in temperature = give rise percentage
- Starter: insert grams of starter needed for baking and current starter:
    - Recommend feeding ratio and necessary X grams of water, flour for baking
    - Give X grams of starter remaining for next feeding
    - Give X grams of discard
- Maintaining Starter: option to select feeding ratios and current starter amount and desired starter amount
    - result should give grams of water/flour needed based on starter and ratio, and discard if desired is less than current
- Bread Recipes??
   - Perhaps CRUD operations through API
*/

function Header({ title }) {
  return <h1>{title ? title : 'BreadWizard'}</h1>;
}

export default function Home() {

  const [start_hydration, setStartValue] = React.useState(350); //start_hydration = 350 of useState - changed by setter funct (setStartValue)
  const [input_start_hydration, setStartInputValue] = React.useState("350"); //input_start_hydration = "350" of useState - changed by setter funct (setStartInputValue)

  const [flour_hydration, setFlourValue] = React.useState(350);
  const [input_flour_hydration, setFlourInputValue] = React.useState("350");

  const [water_hydration, setWaterValue] = React.useState(350);
  const [input_water_hydration, setWaterInputValue] = React.useState("350");

  const [salt_hydration, setSaltValue] = React.useState(10);
  const [input_salt_hydration, setSaltInputValue] = React.useState("10");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 pb-5 gap-3 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <Head>
        <title>BreadWizard</title>
      </Head>
      <header className = "items-center justify-center">
        <h1 className = "text-center font-bold">
          BreadWizard
        </h1> 
      </header>
      <div>
        <nav>
          <Navbar>
            <NavbarBrand>
              <p className="font-bold text-inherit">BreadWizard Logo</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
              <NavbarItem isActive>
                <Link color="foreground" href="page.js" aria-current="page">
                  Calculators
                </Link>
              </NavbarItem>
              <NavbarItem isActive>
                <Link color="foreground" href="page.js">
                  Recipes
                </Link>
              </NavbarItem>
              <NavbarItem isActive>
                <Link color="foreground" href="page.js">
                  About Creator
                </Link>
              </NavbarItem>
            </NavbarContent>
          </Navbar>
        </nav>
        {/* <p className="sub-title italic"> Begin your journey with sourdough bread-making </p> */}
        <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
          <div className="flex w-full flex-col">
            <Tabs aria-label="Options" className = "flex items-center justify-center">
              <Tab key="Preparing" title="Preparing">
                <Card>
                  <CardBody>
                    <h2 className = "text-center font-medium">Calculate Hydration</h2>
                    <br></br>
                    <div>
                      <p className = "text-center">Enter grams of starter:</p>
                      <div className = "flex gap-4 items-center justify-center py-2">
                        <Slider 
                          label=" " 
                          step={1} 
                          maxValue={400} 
                          minValue={0} 
                          className="max-w-[200px]"
                          renderValue={({children, ...props}) => (
                            <output {...props}>
                              <input
                                className="px-1 py-0.5 w-16 text-right text-small font-medium bg-default-100 rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
                                type="text"
                                label="Starter (g)"
                                aria-label="Starter in grams"
                                value={input_start_hydration}
                                onChange={(input_starter_grams) => {
                                  const starter_num = input_starter_grams.target.value;

                                  if (!isNaN(Number(starter_num)))
                                  {
                                    setStartInputValue(starter_num);  //textbox - necessary to change appearance
                                    setStartValue(Number(starter_num)); //slider
                                  }
                                }}
                              />
                            </output>
                          )}
                          value={start_hydration}
                          onChange={(slider_value_starter_grams) => {
                              if (!isNaN(Number(slider_value_starter_grams)))
                              {
                                setStartValue(slider_value_starter_grams); //slider
                                setStartInputValue(slider_value_starter_grams.toString()); //textbox
                              }
                          }}
                        />
                      </div>
                    </div>
                    <br></br>
                    <div>
                      <p className = "text-center">Enter grams of flour:</p>
                      <div className = "flex gap-4 items-center justify-center py-2">
                        <Slider 
                          label=" " 
                          step={1} 
                          maxValue={500} 
                          minValue={0} 
                          className="max-w-[200px]"
                          renderValue={({children, ...props}) => (
                            <output {...props}>
                              <input
                                className="px-1 py-0.5 w-16 text-right text-small font-medium bg-default-100 rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
                                type="text"
                                label="Flour (g)"
                                aria-label="Flour in grams"
                                value={input_flour_hydration}
                                onChange={(input_flour_grams) => {
                                  const flour_num = input_flour_grams.target.value;

                                  if (!isNaN(Number(flour_num)))
                                  {
                                    setFlourInputValue(flour_num);
                                    setFlourValue(Number(flour_num));
                                  }
                                }}
                              />
                            </output>
                          )}
                          value={flour_hydration}
                          onChange={(slider_value_flour_grams) => {
                              if (!isNaN(Number(slider_value_flour_grams)))
                              {
                                setFlourValue(slider_value_flour_grams);
                                setFlourInputValue(slider_value_flour_grams.toString());
                              }
                          }}
                        />
                      </div>
                    </div>
                    <br></br>
                    <div>
                      <p className = "text-center">Enter grams of water:</p>
                      <div className = "flex gap-4 items-center justify-center py-2">
                        <Slider 
                          label=" " 
                          step={1} 
                          maxValue={400} 
                          minValue={0} 
                          className="max-w-[200px]"
                          renderValue={({children, ...props}) => (
                            <output {...props}>
                              <input
                                className="px-1 py-0.5 w-16 text-right text-small font-medium bg-default-100 rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
                                type="text"
                                label="Water (g)"
                                aria-label="Water in grams"
                                value={input_water_hydration}
                                onChange={(input_water_grams) => {
                                  const water_num = input_water_grams.target.value;

                                  if (!isNaN(Number(water_num)))
                                  {
                                    setWaterInputValue(water_num);
                                    setWaterValue(Number(water_num));
                                  }
                                }}
                              />
                            </output>
                          )}
                          value={water_hydration}
                          onChange={(slider_value_water_grams) => {
                              if (!isNaN(Number(slider_value_water_grams)))
                              {
                                setWaterValue(slider_value_water_grams);
                                setWaterInputValue(slider_value_water_grams.toString());
                              }
                          }}
                        />
                      </div>
                    </div>
                    <br></br>
                    <div>
                      <p className = "text-center">Enter grams of salt:</p>
                      <div className = "flex gap-4 items-center justify-center py-2">
                        <Slider 
                          label=" " 
                          step={1} 
                          maxValue={40} 
                          minValue={0} 
                          className="max-w-[200px]"
                          renderValue={({children, ...props}) => (
                            <output {...props}>
                              <input
                                className="px-1 py-0.5 w-16 text-right text-small font-medium bg-default-100 rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
                                type="text"
                                label="Salt (g)"
                                aria-label="Salt in grams"
                                value={input_salt_hydration}
                                onChange={(input_salt_grams) => {
                                  const salt_num = input_salt_grams.target.value;

                                  if (!isNaN(Number(salt_num)))
                                  {
                                    setSaltInputValue(salt_num);
                                    setSaltValue(Number(salt_num));
                                  }
                                }}
                              />
                            </output>
                          )}
                          value={salt_hydration}
                          onChange={(slider_value_salt_grams) => {
                              if (!isNaN(Number(slider_value_salt_grams)))
                              {
                                setSaltValue(slider_value_salt_grams);
                                setSaltInputValue(slider_value_salt_grams.toString());
                              }
                          }}
                        />
                      </div>
                    </div>
                    <br></br>
                    <hr></hr>
                    <div className = "flex items-center justify-center py-2">
                      <h2 className = "text-center px-2">Hydration of Loaf: </h2>
                      <h2 className = "text-center">100%</h2>
                    </div>
                  </CardBody>
                </Card>
                <br></br>
                <Card>
                  <CardBody>
                    <h2 className = "text-center font-medium">Calculate Necessary Ingredients</h2>
                    <br></br>
                    <div>
                      <p className = "text-center">Enter desired hydration:</p>
                      <div className = "flex gap-4 items-center justify-center py-2">
                        <Input type="text" label="Percentage (%)" className="max-w-[150px]"/>
                      </div>
                    </div>
                    <br></br>
                    <div>
                      <p className = "text-center">Enter current grams of flour:</p>
                      <div className = "flex gap-4 items-center justify-center py-2">
                        <Input type="text" label="Starter (g)" className="max-w-[110px]"/>
                        <Slider 
                          label=" " 
                          step={1} 
                          maxValue={400} 
                          minValue={0} 
                          defaultValue={350}
                          className="max-w-[110px]"
                        />
                      </div>
                    </div>
                    <br></br>
                    <hr></hr>
                    <div className = "p-2">
                      <h2 className = "font-semibold p-2 underline text-center">Required Ingredients: </h2>
                      
                      <Table aria-label="Ingredient collection table">
                        <TableHeader>
                          <TableColumn className = "font-medium text-center">FLOUR (g)</TableColumn>
                          <TableColumn className = "font-medium text-center">WATER (g)</TableColumn>
                          <TableColumn className = "font-medium text-center">STARTER (g)</TableColumn>
                          <TableColumn className = "font-medium text-center">SALT (g)</TableColumn>
                        </TableHeader>
                        <TableBody>
                          <TableRow key="1">
                            <TableCell id = "flour" className = "font-medium text-center">180</TableCell>
                            <TableCell id = "water" className = "font-medium text-center">180</TableCell>
                            <TableCell id = "starter" className = "font-medium text-center">180</TableCell>
                            <TableCell id = "salt" className = "font-medium text-center">180</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardBody>  
                </Card>  
              </Tab>
              <Tab key="Feeding" title="Feeding">
                <Card>
                  <CardBody>
                    <h2 className = "text-center font-medium">Calculate Hydration</h2>
                    <br></br>
                    <div>
                      <p className = "text-center">Enter grams of starter:</p>
                      <div className = "flex gap-4 items-center justify-center py-2">
                        <Input type="text" label="Starter (g)" className="max-w-[110px]"/>
                        <Slider 
                          label=" " 
                          step={1} 
                          maxValue={400} 
                          minValue={0} 
                          defaultValue={350}
                          className="max-w-[110px]"
                        />
                      </div>
                    </div>
                    <br></br>
                  </CardBody>
                </Card>  
              </Tab>
              <Tab key="Rising" title="Rising">
                <Card>
                  <CardBody>
                    <h2 className = "text-center font-medium">Necessary Rise for Baking</h2>
                    <br></br>
                    <div>
                      <p className = "text-center">Enter current temperature of dough:</p>
                      <div className = "flex gap-4 items-center justify-center py-2">
                        <Input type="text" label="Fahrenheit (°F)" className="max-w-[150px]"/>
                      </div>
                    </div>
                    <br></br>
                    <hr></hr>
                    <div className = "p-2">
                      <h2 className = "font-semibold p-2 underline text-center">Rise Percentage: </h2>
                      <div className = "flex items-center justify-center">
                        <h3 className = "font-medium text-center">30</h3>
                        <h3 className = "text-center">%</h3>
                      </div>
                    </div>
                  </CardBody>
                </Card>  
              </Tab>
            </Tabs>
          </div>
          
          <Image
            className="dark:invert"
            src="https://nextjs.org/icons/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
        </main>
      </div>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}

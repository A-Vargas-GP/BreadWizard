//Running Server: pnpm dev
'use client'
import Image from "next/image";
import React from "react";
import Head from "next/head";

import {Slider} from "@nextui-org/slider";
import {Input} from "@nextui-org/input";
import {Tabs, Tab} from "@nextui-org/tabs";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, getKeyValue} from "@nextui-org/table";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@nextui-org/navbar";
import {Link} from "@nextui-org/link";
import {Accordion, AccordionItem} from "@nextui-org/accordion";
import {Select, SelectSection, SelectItem} from "@nextui-org/select";

import {ratioFill} from './data/data.js';
import {hydration, ingredients} from './data/preparing.js';
import {necessaryStarter} from './data/feeding.js';
import {temperatureRise} from './data/rising.js';

/* 
TODO:
- Digital drawing of Logo
- Calculations for:
    - DONE: Based on X grams of water, flour, salt, and starter = give % of hydration
    - Based on hydration and X grams of flour = calculate potential X grams of water, flour, salt, and starter
    - Put in temperature = give rise percentage
    - Maintaining/Using Starter: insert grams of starter needed for baking and current starter:
        - Recommend feeding ratio and necessary X grams of water, flour for baking
        - Give X grams of starter remaining for next feeding
        - Give X grams of discard
- Reusable Components:
    - Sliders?
    - Tables?
- Bread Recipes?
   - Perhaps CRUD operations through API?
- Don't forget to remove horizontal motion that keeps adjusting for all elements
*/

/*
  Reminders: 
  - useState
      Refers to the initial value only once at the initial render i.e. declaration of variable
      Can only be declared with component (i.e. funct that return UI elements)

*/

function Header({ title }) {
  return <h1>{title ? title : 'BreadWizard'}</h1>;
}

export default function Home() {

  /* Calculating hydration*/
  const [start_hydration, setStartValue] = React.useState(200); //start_hydration = 350 of useState - changed by setter funct (setStartValue)
  const [input_start_hydration, setStartInputValue] = React.useState("100"); //input_start_hydration = "350" of useState - changed by setter funct (setStartInputValue)

  const [flour_hydration, setFlourValue] = React.useState(500);
  const [input_flour_hydration, setFlourInputValue] = React.useState("500");

  const [water_hydration, setWaterValue] = React.useState(350);
  const [input_water_hydration, setWaterInputValue] = React.useState("350"); 

  /* Calculating necessary ingredients */
  const [curr_flour, setCurrFlourValue] = React.useState(350);
  const [input_curr_flour, setCurrFlourInputValue] = React.useState("350");
  
  /* Calculating necessary starter */
  const [curr_starter, setCurrStarterValue] = React.useState(20);
  const [input_curr_starter, setCurrStarterInputValue] = React.useState("20");

  const [desired_starter, setDesiredStarterValue] = React.useState(20);
  const [input_desired_starter, setDesiredStarterInputValue] = React.useState("20");

  /* Populating Select dropdown */
  const ratios = ratioFill(10);
  // console.log('Ratios data:', ratios);

  /* Calculation of Hydration */
  const hydrations = hydration(start_hydration, flour_hydration, water_hydration);
  // console.log('Hydration: ', hydrations);

  return (
    <div className="grid grid-rows-[10px_1fr_10px] justify-items-center p-4 pb-5 gap-3 sm:p-10 font-[family-name:var(--font-geist-sans)]">
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
                <Link color="foreground" href="." aria-current="page">
                  Calculators
                </Link>
              </NavbarItem>
              <NavbarItem isActive>
                <Link color="foreground" href="/posts">
                  Recipes
                </Link>
              </NavbarItem>
              <NavbarItem isActive>
                <Link color="foreground" href="https://a-vargas-gp.github.io">
                  About Creator
                </Link>
              </NavbarItem>
            </NavbarContent>
          </Navbar>
        </nav>
        {/* <p className="sub-title italic"> Begin your journey with sourdough bread-making </p> */}
        <main className="flex flex-col gap-4 row-start-2 sm:items-start">
          <div className="flex w-full flex-col">
            <Tabs aria-label="Options" className = "justify-center">
              <Tab key="Preparing" title="Preparing">
                <Card>
                  <CardBody>
                    <h2 className = "text-center font-medium">Calculate Hydration</h2>
                    <br></br>
                    <div>
                      <p className = "text-center">Enter grams of starter:</p>
                      <div className = "flex gap-4 justify-center py-2">
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
                      <div className = "flex gap-4 justify-center py-2">
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
                      <div className = "flex gap-4 justify-center py-2">
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
                    <hr></hr>
                    <div className = "justify-center p-2">
                      <h2 className = "text-center font-bold underline p-2">Hydration of Loaf: </h2>
                      <Table aria-label="Ingredient collection table">
                        <TableHeader>
                          <TableColumn key="hydration" className = "font-medium text-center">PERCENTAGE (%)</TableColumn>
                        </TableHeader>
                        <TableBody items={hydrations}>
                          {(item) => (
                            <TableRow key={item.key}>
                              {(columnKey) => <TableCell className = "font-medium text-center">{getKeyValue(item, columnKey)}</TableCell>}
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
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
                      <div className = "flex gap-4 justify-center py-2">
                        <Input type="text" label="Percentage (%)" className="max-w-[150px]"/>
                      </div>
                    </div>
                    <br></br>
                    <div>
                      <p className = "text-center">Enter current grams of flour:</p>
                      <div className = "flex gap-4 justify-center py-2">
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
                                value={input_curr_flour}
                                onChange={(input_curr_flour_grams) => {
                                  const flour_num = input_curr_flour_grams.target.value;

                                  if (!isNaN(Number(flour_num)))
                                  {
                                    setCurrFlourInputValue(flour_num);
                                    setCurrFlourValue(Number(flour_num));
                                  }
                                }}
                              />
                            </output>
                          )}
                          value={curr_flour}
                          onChange={(slider_value_flour_grams) => {
                              if (!isNaN(Number(slider_value_flour_grams)))
                              {
                                setCurrFlourValue(slider_value_flour_grams);
                                setCurrFlourInputValue(slider_value_flour_grams.toString());
                              }
                          }}
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
                    <h2 className = "text-center font-medium">Calculate Necessary Starter</h2>
                    <br></br>
                    <div>
                      <p className = "text-center">Select a feeding ratio:</p>
                      <div className = "flex gap-10 justify-center py-2 px-10">
                        <Select 
                          label="Starter" 
                          className="max-w-xs" 
                          variant = "faded"
                        >
                          {ratios.map((ratio) => (
                            <SelectItem key={ratio.key}>
                              {ratio.label}
                            </SelectItem>
                          ))}
                        </Select>
                        <Select 
                          label="Flour" 
                          className="max-w-xs" 
                          variant = "faded"
                        >
                          {ratios.map((ratio) => (
                            <SelectItem key={ratio.key}>
                              {ratio.label}
                            </SelectItem>
                          ))}
                        </Select>
                        <Select 
                          label="Water" 
                          className="max-w-xs"
                          variant = "faded" 
                        >
                          {ratios.map((ratio) => (
                            <SelectItem key={ratio.key}>
                              {ratio.label}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <br></br>
                    <div>
                      <p className = "text-center">Enter current grams of starter:</p>
                      <div className = "flex gap-4 justify-center py-2">
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
                                label="Starter (g)"
                                aria-label="Starter in grams"
                                value={input_curr_starter}
                                onChange={(input_curr_starter_grams) => {
                                  const starter_num = input_curr_starter_grams.target.value;

                                  if (!isNaN(Number(starter_num)))
                                  {
                                    setCurrStarterInputValue(starter_num);
                                    setCurrStarterValue(Number(starter_num));
                                  }
                                }}
                              />
                            </output>
                          )}
                          value={curr_starter}
                          onChange={(slider_value_starter_grams) => {
                              if (!isNaN(Number(slider_value_starter_grams)))
                              {
                                setCurrStarterValue(slider_value_starter_grams);
                                setCurrStarterInputValue(slider_value_starter_grams.toString());
                              }
                          }}
                        />
                      </div>
                    </div>
                    <div className = "pb-4">
                      <p className = "text-center">Enter desired grams of starter:</p>
                      <div className = "flex gap-4 justify-center py-2">
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
                                label="Starter (g)"
                                aria-label="Starter in grams"
                                value={input_desired_starter}
                                onChange={(input_desired_starter_grams) => {
                                  const starter_num = input_desired_starter_grams.target.value;

                                  if (!isNaN(Number(starter_num)))
                                  {
                                    setDesiredStarterInputValue(starter_num);
                                    setDesiredStarterValue(Number(starter_num));
                                  }
                                }}
                              />
                            </output>
                          )}
                          value={desired_starter}
                          onChange={(slider_value_starter_grams) => {
                              if (!isNaN(Number(slider_value_starter_grams)))
                              {
                                setDesiredStarterValue(slider_value_starter_grams);
                                setDesiredStarterInputValue(slider_value_starter_grams.toString());
                              }
                          }}
                        />
                      </div>
                    </div>                    
                    <hr></hr>
                    <h2 className = "font-semibold p-4 underline text-center">Necessary Items: </h2>
                    <Table aria-label="Ingredient collection table">
                      <TableHeader>
                        <TableColumn className = "font-medium text-center">RATIO (S:F:W)</TableColumn>
                        <TableColumn className = "font-medium text-center">STARTER (g)</TableColumn>
                        <TableColumn className = "font-medium text-center">FLOUR (g)</TableColumn>
                        <TableColumn className = "font-medium text-center">WATER (g)</TableColumn>
                      </TableHeader>
                      <TableBody>
                        <TableRow key="1">
                          <TableCell id = "ratio" className = "font-medium text-center">1:3:2</TableCell>
                          <TableCell id = "starter" className = "font-medium text-center">20</TableCell>
                          <TableCell id = "flour" className = "font-medium text-center">60</TableCell>
                          <TableCell id = "water" className = "font-medium text-center">40</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <br></br>
                    <Table aria-label="Starter Table">
                      <TableHeader>
                        <TableColumn className = "font-medium text-center">REMAINING STARTER (G)</TableColumn>
                        <TableColumn className = "font-medium text-center">DISCARD (g)</TableColumn>
                      </TableHeader>
                      <TableBody>
                        <TableRow key="1">
                          <TableCell id = "remainder" className = "font-medium text-center">180</TableCell>
                          <TableCell id = "discard" className = "font-medium text-center">180</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
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
                      <div className = "flex gap-4 justify-center py-2">
                        <Input type="text" label="Fahrenheit (°F)" className="max-w-[150px]"/>
                      </div>
                    </div>
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <div className = "px-10">
                      <Table aria-label="Ingredient collection table">
                        <TableHeader>
                          <TableColumn className = "font-medium text-center">RISE PERCENTAGE</TableColumn>
                        </TableHeader>
                        <TableBody>
                          <TableRow key="1">
                            <TableCell id = "salt" className = "font-medium text-center">30%</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>  
              </Tab>
            </Tabs>
          </div>
          <div className = "flex justify-center py-4">
            <h2 className = "font-bold text-center py-2">Frequently Asked Questions</h2>
            <Accordion isCompact selectionMode="multiple">
              <AccordionItem key="1" aria-label="Accordion 1" title="What is sourdough starter?">
              </AccordionItem>
              <AccordionItem key="2" aria-label="Accordion 2" title="What is a feeding ratio?">
              </AccordionItem>
              <AccordionItem key="3" aria-label="Accordion 3" title="Why is feeding my starter important?">
              </AccordionItem>
              <AccordionItem key="4" aria-label="Accordion 4" title="What is discard?">
              </AccordionItem>
              <AccordionItem key="5" aria-label="Accordion 5" title="What is sourdough bread made of?">
              </AccordionItem>
              <AccordionItem key="6" aria-label="Accordion 6" title="Why is hydration important?">
              </AccordionItem>
              <AccordionItem key="7" aria-label="Accordion 7" title="Why is the temperature of my dough important?">
              </AccordionItem>
            </Accordion>
          </div>
        </main>
      </div>

      <footer className="flex gap-6 items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="."
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
          Home
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="./posts/"
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
          Recipes
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://a-vargas-gp.github.io"
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
          About Creator →
        </a>
      </footer>
    </div>
  );
}

import AiModelList from "@/shared/AiModelList";
import React, { useContext, useState } from "react";
import Image from "next/image";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { MessagesSquare, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

import { AiSelectedModelContext } from "@/context/AiSelectedModelContext";
import { db } from "@/config/FirebaseConfig";
import { useUser } from "@clerk/nextjs";
import { doc, updateDoc } from "firebase/firestore";

function AiMultiModels() {
    const {user}=useUser();
    const [aiModelList, setAiModelList] = useState(AiModelList);
    const { aiSelectedModels, setAiSelectedModels } = useContext(AiSelectedModelContext);
    console.log("aiSelectedModels", aiSelectedModels)
    const onToggleChange = (model, value) => {
        setAiModelList((prev) =>
            prev.map((m) =>
                m.model === model ? { ...m, enable: value } : m
            )
        );
    };

    const onSelectValue = async (parentModel, value) => {
        setAiSelectedModels(prev => ({
            ...prev,
            [parentModel]: {
                modelId: value
            }
        }))

        //update to Firebase Database
        const docRef=doc(db,"users",user?.primaryEmailAddress?.emailAddress);
        await updateDoc(docRef,{
            selectedModelPref: aiSelectedModels
        })
    }

    return (
        <div className="flex flex-1 h-[75vh] border-b">
            {aiModelList.map((model, index) => (
                <div
                    key={index}
                    className={`flex flex-col border-r h-full overflow-auto ${model.enable ? 'flex-1 min-w-[400px]' : 'w-[100px] flex-none'}`

                    }
                >
                    <div className="flex w-full h-[70px] items-center justify-between border-b p-4">
                        <div className="flex items-center gap-4">
                            <Image
                                src={model.icon}
                                alt={model.model}
                                width={24}
                                height={24}
                            />

                            {model.enable && (
                                <Select defaultValue={aiSelectedModels[model.model].modelId} 
                                onValueChange={(value) => onSelectValue(model.model, value)}
                                disabled={model.premium}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder={aiSelectedModels[model.model].modelId} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup className="px-3">
                                            <SelectLabel className="text-sm text-gray-400">Free</SelectLabel>
                                            {model.subModel.map((subModel, idx) => subModel.premium == false && (
                                                <SelectItem key={idx} value={subModel.id}>
                                                    {subModel.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                        <SelectGroup className="px-3">
                                            <SelectLabel className="text-sm text-gray-400">Premium</SelectLabel>
                                            {model.subModel.map((subModel, idx) => subModel.premium == true && (
                                                <SelectItem key={idx} value={subModel.name} disabled={subModel.premium}>
                                                    {subModel.name} {subModel.premium && <Lock className="h-4 w-4" />}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        </div>

                        <div>
                            {model.enable ? <Switch
                                checked={model.enable}
                                onCheckedChange={(v) => onToggleChange(model.model, v)}
                            />
                                : <MessagesSquare onClick={() => onToggleChange(model.model, true)} />}
                        </div>
                    </div>
                    {model.premium && model.enable && <div className="flex items-center justify-center h-full">
                        <Button><Lock />Upgrade to unlock</Button>
                    </div>}
                </div>
            ))}



        </div>
    );
}

export default AiMultiModels;



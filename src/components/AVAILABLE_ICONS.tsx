import { 
    LucideIcon,
    Handbag,
    MirrorRound,
    Cpu,
    Gem,
    Shapes
} from "lucide-react";

export type AvailableIconItem=[
    name:string,
    icon:LucideIcon
];

export const AVAILABLE_ICONS:AvailableIconItem[]=[
    ["Handbag", Handbag],
    ["MirrorRound", MirrorRound],
    ["Cpu", Cpu],
    ["Gem", Gem],
    ["Shapes", Shapes],
];

export const getIconByName=(name:string)=>{
    const icon=AVAILABLE_ICONS.find(([iconName])=>iconName===name);
    return icon?icon[1]:Shapes;
}
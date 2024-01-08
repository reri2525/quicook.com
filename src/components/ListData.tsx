import HomeIcon from '@mui/icons-material/Home';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export const ListData1 = [
    {
        title: "ホーム",
        icon: <HomeIcon  style={{ fontSize: '20px' }}/>,
        link: "/home/page/1"
    },
    {
        title: "フォロー中",
        icon:  <PersonAddAlt1Icon  style={{ fontSize: '20px' }}/>,
        link: "/following/page/1"
    },
    {
        title: "ブックマーク",
        icon:  <BookmarkBorderIcon  style={{ fontSize: '20px' }}/>,
        icon2: <BookmarkIcon  style={{ fontSize: '20px' }}/>,
        link: "/bookmark/page/1"
    },
    
]
export const ListData2 = [
    {title: "レシピカテゴリ", icon: <RestaurantIcon  style={{ fontSize: '20px' }}/>},
    {
     icon: <ExpandMoreIcon style={{ fontSize: '30px', cursor: 'pointer' }}/>,
     icon2: <ExpandLessIcon style={{ fontSize: '30px', cursor: 'pointer' }}/>
    }
]
export const CategoryData = [
    {title: "お肉", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcVPtsAqQ7iFWEZ99i_XclYttOyQLMaDbgCQ&usqp=CAU"},
    {title: "魚介", icon: "https://assets.cpcdn.com/assets/themes/top/category_icons/12.png?6f75e5930073a3e06f5dd15513fa98f78bf9db908faf7b7e19b8b3385ce65251"},
    {title: "野菜", icon: "https://assets.cpcdn.com/assets/themes/top/category_icons/14.png?f4702670f91fab688d825413cf5c3fab5813d51932f829b7d36c4ba8f17b78f8"},
    {title: "ご飯もの", icon: "https://assets.cpcdn.com/assets/themes/top/category_icons/2.png?4b1ba759c42e5dc56dc33d87c883809e5edf6b2ae19003a20f39f3d617c9535c"},
    {title: "麺", icon: "https://assets.cpcdn.com/assets/themes/top/category_icons/9.png?8c6aac8c49299e9250bc43b01ebf7f848c3f670382590331667c18792693bc06"},
    {title: "スープ・汁物", icon: "https://assets.cpcdn.com/assets/themes/top/category_icons/15.png?6a2f9e30bf1a07d14c9deb7ed8cbda0f56fbe6cb01c6b9f25750a522a64e623b"},
    {title: "お菓子", icon: "https://assets.cpcdn.com/assets/themes/top/category_icons/19.png?5a90fcff6a4e526b5059a6bb130e4f398e8a8fb155d979ee861c04c5fecb8a75"},
    {title: "パン", icon: "https://assets.cpcdn.com/assets/themes/top/category_icons/17.png?bf52407160de012a8208ca3cb424a4976dc9d4cb18ee66e031b249d5e8da41dd"},
]
export const DishData = [
    {dish1: "牛肉", dish2: "豚肉", dish3: "鶏肉"},
    {dish1: "干物", dish2: "イカ", dish3: "海老"},
    {dish1: "サラダ", dish2: "野菜炒め"},
    {dish1: "おにぎり", dish2: "どんぶり"},
    {dish1: "パスタ", dish2: "ラーメン", dish3: "そば"},
    {dish1: "中華スープ", dish2: "味噌汁"},
    {dish1: "クッキー", dish2: "チョコ"},
    {dish1: "ケーキ", dish2: "サンドイッチ"}
]
export const ListData3 = [
    { title: "設定", icon: <SettingsIcon />, icon2: <SettingsSuggestIcon /> },
    { title: "ヘルプ", icon: <HelpOutlineIcon />, icon2: <HelpIcon /> }
]

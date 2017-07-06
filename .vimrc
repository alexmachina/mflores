filetype off
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
 
Plugin 'vim-syntastic/syntastic'

Plugin 'VundleVim/Vundle.vim'

Plugin 'pangloss/vim-javascript'

Plugin 'mxw/vim-jsx'

Plugin 'scrooloose/nerdtree'

Plugin 'jistr/vim-nerdtree-tabs'

Plugin 'wakatime/vim-wakatime'

Plugin 'flazz/vim-colorschemes'

Plugin 'digitaltoad/vim-pug'

Plugin 'lambdatoast/elm.vim'
Plugin 'Yggdroot/indentLine'
Plugin 'tanAngeloff/php.vim'

call vundle#end() 

filetype plugin indent on
nnoremap th  :tabfirst<CR>
nnoremap tj  :tabnext<CR>
nnoremap tk  :tabprev<CR>
nnoremap tl  :tablast<CR>
set nocompatible
set nobackup
set nowritebackup
set noswapfile
set ruler
set ignorecase
set smartcase
set autoread
set list listchars=tab:\ \ ,trail:^
set number
let g:javascript_plugin_jsdoc = 1

set foldmethod=syntax
set shiftwidth=2
set expandtab
set softtabstop=2
:syntax on
set autoindent
":colorscheme lucius
"set shortmess+=I
filetype on
set term=screen-256color
set clipboard=unnamedplus
let g:closetag_filenames = "*.jsx,*.html,*.xhtml,*.phtml" 
let g:jsx_ext_required = 0

set statusline+=%#warningmsg#
set statusline+=%{SyntasticStatuslineFlag()}
set statusline+=%*

let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 1
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0
let g:syntastic_javascript_checkers = ['eslint']

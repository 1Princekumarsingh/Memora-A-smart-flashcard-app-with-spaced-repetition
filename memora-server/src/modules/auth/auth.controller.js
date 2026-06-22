import * as authService from "./auth.service.js";

export const signup = async(req, res) => {

    const result = await authService.signup(req.body);

    res.status(201).json({
        success: true, 
        data: result
    })
} 

export const login = async(req, res) => {
    const result = await authService.login(req.body);

    res.status(200).json({
        success: true,
        data: result
    })
}

export const refresh = async(req, res) => {
    const result = await authService.refresh(req.body.refreshToken);

    res.status(200).json({
        success: true,
        data: result
    })
}

export const logout = async (req, res) => {
    await authService.logout(req.body.refreshToken);

    res.status(200).json({
        success: true
    })
}